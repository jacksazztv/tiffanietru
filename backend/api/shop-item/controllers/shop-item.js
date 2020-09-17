'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async findBySlug(ctx) {
        const { _slug } = ctx.params;
        const entity = await strapi.services['shop-item'].findOne({ slug: _slug });        
        return sanitizeEntity(entity, { model: strapi.models['shop-item']})
    }
};
