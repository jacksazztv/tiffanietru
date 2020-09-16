'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async findBySlug(ctx) {
        const { _slug } = ctx.params;

        const entity = await strapi.services['shop-item'].findOne({ slug: _slug });

        if (ctx.state.user) {
            entity.giveDiscount = await strapi.services['twitch-subs'].isTwitchSub(ctx.state.user);
        } else {
            entity.giveDiscount = false;
        }
        
        return sanitizeEntity(entity, { model: strapi.models['shop-item']})
    }
};
