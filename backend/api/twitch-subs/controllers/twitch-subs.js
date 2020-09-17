'use strict';

module.exports = {
    async findTwitchUser(ctx) {
        const subscribed = await strapi.services['twitch-subs'].isSubscribed(ctx.state.user);
        
        return { subscribed: subscribed };
    }
};
