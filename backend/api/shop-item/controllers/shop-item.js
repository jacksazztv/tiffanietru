'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    /**
     * Retrieve a product from its slug
     * 
     * @return {Object}
     */
    async findBySlug(ctx) {
        const { _slug } = ctx.params;
        const entity = await strapi.services['shop-item'].findOne({ slug: _slug });        
        return sanitizeEntity(entity, { model: strapi.models['shop-item']})
    },

    /**
     * Retrieve items from array of ids
     * 
     * @return {Array}
     */
    async findCartItems(ctx) {
        const { _ids } = ctx.params;

        if (!_ids || !_ids.length) {
            return [];
        }

        const entities = await strapi.services['shop-item'].find({ id_in: _ids });
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['shop-item'] }));
    }
};
