'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

const PAYPAL_CLIENT = 'PAYPAL_SANDBOX_CLIENT';
const PAYPAL_SECRET = 'PAYPAL_SANDBOX_SECRET';

const PAYPAL_OAUTH_API = 'https://api.sandbox.paypal.com/v1/oauth2/token/';
const PAYPAL_ORDER_API = 'https://api.sandbox.paypal.com/v2/checkout/orders/';

module.exports = {
    async createPaypalTransaction(ctx) {
        // TODO
    }
};
