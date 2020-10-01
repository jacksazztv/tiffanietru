'use strict';

const axios = require('axios');

module.exports = {
    /**
     * Returns if the connected twitch account is subscribed or not
     * 
     * @return {Boolean}
     */
    async isSubscribed(user) {
        if (!user) {
            return false;
        }
        
        const { twitchAccount } = user;

        if (!twitchAccount) {
            return false;
        }

        const twitchSubs = await strapi.services['twitch-subs'].find();

        return twitchSubs.data.some(sub => sub.user_id === twitchAccount.id);
    },

    /**
     * Fetch sub data from twitch and save it into the database.
     * This function is called daily via cron.
     * 
     * @return {Object}
     */
    async fetchSubData() {
        // Old subgoal coming in handy
        const subpoints = await axios.get('https://subgoal.glitch.me/api/subpoints');

        if (subpoints.data.subbers) {
            return await strapi.services['twitch-subs'].createOrUpdate({ data: subpoints.data.subbers });
        }
    }
};
