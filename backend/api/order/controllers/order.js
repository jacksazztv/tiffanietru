'use strict';

const axios = require('axios');

const { sanitizeEntity } = require('strapi-utils');

const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

const PAYPAL_OAUTH_API = 'https://api.sandbox.paypal.com/v1/oauth2/token/';
const PAYPAL_ORDER_API = 'https://api.sandbox.paypal.com/v2/checkout/orders/';

module.exports = {
    /**
     * Set up a transaction for the user to approve
     *
     * @return {Object}
     */
    async createPaypalTransaction(ctx) {     
        const { items } = ctx.request.body;

        if (!items) {
            return ctx.badRequest('No items provided');
        }

        // Get an access token from the paypal api
        const auth = await axios({
            url: PAYPAL_OAUTH_API,
            method: 'post',
            data: 'grant_type=client_credentials',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: PAYPAL_CLIENT,
                password: PAYPAL_SECRET
            }
        });

        // Check if user is a twitch sub
        const subscribed = await strapi.services['twitch-subs'].isSubscribed(ctx.state.user);

        // Fetch the real items from the database
        const itemIds = items.map(item => item.id);
        const shopItems = await strapi.services['shop-item'].find({ id_in: itemIds });

        // Full total of items not including discounts
        const itemTotal = shopItems.reduce((accumulator, item) => {
            return accumulator + parseInt(item.price);
        }, 0);

        // Total discount for the order
        const discountTotal = shopItems.reduce((accumulator, item) => {
            if (subscribed) {
                return accumulator + Math.floor(parseInt(item.price) * (item.subDiscount / 100));
            }
            return accumulator;
        }, 0);

        const itemData = shopItems.map(item => {
            return {
                name: item.name,
                unit_amount: {
                    currency_code: 'USD',
                    value: (parseInt(item.price) / 100).toFixed(2)
                },
                quantity: 1
            };
        });

        const order = await axios({
            url: PAYPAL_ORDER_API,
            method: 'post',
            data: {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: ((itemTotal - discountTotal) / 100).toFixed(2),
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: (itemTotal / 100).toFixed(2)
                            },
                            discount: {
                                currency_code: 'USD',
                                value: (discountTotal / 100).toFixed(2)
                            }
                        }
                    },
                    items: itemData
                }],
                application_context: {
                    shipping_preference: 'NO_SHIPPING'
                }
            },
            headers: {
                Authorization: `Bearer ${auth.data.access_token}`
            }
        });

        return { orderID: order.data.id };
    },
    /**
     * Finalize the order
     * 
     * @return {Object}
     */
    async capturePaypalOrder(ctx) {
        const { orderID } = ctx.request.body;

        if (!orderID) {
            return ctx.badRequest('No order ID provided');
        }

        // Get an access token from the paypal api
        const auth = await axios({
            url: PAYPAL_OAUTH_API,
            method: 'post',
            data: 'grant_type=client_credentials',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: PAYPAL_CLIENT,
                password: PAYPAL_SECRET
            }
        });

        const capture = await axios({
            url: `${PAYPAL_ORDER_API}${orderID}/capture`,
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.data.access_token}`
            }
        });

        /*if (!capture.data.error) {
            const captureID = capture.data.purchase_units[0].payments.captures[0].id;
        }*/

        return capture.data;
    },
    /**
     * Retrieve user's orders
     * 
     * @return {Array} 
     */
    async findMyOrders(ctx) {
        let entities;

        if (!ctx.state.user) {
            return ctx.unauthorized('Unauthorized!');
        }

        // Users can only view their own orders
        ctx.query = {
            ...ctx.query,
            'user.id': ctx.state.user.id
        };

        if (ctx.query._q) {
            entities = await strapi.services.order.search(ctx.query);
        } else {
            entities = await strapi.services.order.find(ctx.query);
        }

        return entities.map(entity => sanitizeEntity(entity, { model:  strapi.models.order }));
    },
    /**
     * Retrieve user's owned portfolios from orders
     *
     * @return {Array}
     */
    async findMyPortfolios(ctx) {
        let entities;

        if (!ctx.state.user) {
            return ctx.unauthorized('Unauthorized!');
        }

        ctx.query = {
            ...ctx.query,
            'user.id': ctx.state.user.id,
            type: 'Digital'
        };

        if (ctx.query._q) {
            entities = await strapi.services.order.search(ctx.query);
        } else {
            entities = await strapi.services.order.find(ctx.query);
        }

        let portfolios = [];
        entities.forEach(entity => {
            portfolios = portfolios.concat(entity.portfolios);
        });

        return portfolios.map(entity => sanitizeEntity(entity, { model: strapi.models.portfolio }));
    }
};
