'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    /**
     * Retrieve records.
     *
     * @return {Array}
     */
    async find(ctx) {
        let entities;

        // Only return published blog posts
        ctx.query = {
            ...ctx.query,
            status: 'Published'
        };

        if (ctx.query._q) {
            entities = await strapi.services['blog-post'].search(ctx.query);
        } else {
            entities = await strapi.services['blog-post'].find(ctx.query);
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['blog-post'] }));
    },
};