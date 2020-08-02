'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */
    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            data.owner = ctx.state.user.id;
            entity = await strapi.services.purchase.create(data, { files });
        } else {
            ctx.request.body.owner = ctx.state.user.id;
            entity = await strapi.services.purchase.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.purchase });
    },
    /**
     * Retrieve records.
     *
     * @return {Array}
     */
    async find(ctx) {
        let entities;
        
        const user = ctx.state.user;

        if (typeof user === 'undefined' || user === null || typeof user.id === 'undefined' || user.id === null) {
            return ctx.unauthorized('Unauthorized!');
        }

        // Users can only fetch their own purchases
        Object.assign(ctx.query, { 'owner.id': user.id });

        if (ctx.query._q) {
            entities = await strapi.services.purchase.search(ctx.query);
        } else {
            entities = await strapi.services.purchase.find(ctx.query);
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.purchase }));
    },
};
