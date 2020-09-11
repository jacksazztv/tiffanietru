'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

const PAYPAL_CLIENT = 'PAYPAL_SANDBOX_CLIENT';
const PAYPAL_SECRET = 'PAYPAL_SANDBOX_SECRET';

const PAYPAL_OAUTH_API = 'https://api.sandbox.paypal.com/v1/oauth2/token/';
const PAYPAL_ORDER_API = 'https://api.sandbox.paypal.com/v2/checkout/orders/';

module.exports = {
    async createPaypalTransaction(ctx) {
        // TODO
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
    }
};
