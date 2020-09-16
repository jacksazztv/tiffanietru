'use strict';

const axios = require('axios');

let twitchSubs;

module.exports = {
    /**
     * Returns if the connected twitch account is subscribed or not
     * 
     * @return {Boolean}
     */
    async isTwitchSub(user) {
        const { twitchAccount } = user;

        if (!twitchAccount) {
            return false;
        }

        if (!twitchSubs) {
            const entity = await strapi.services['twitch-subs'].find();
            twitchSubs = entity.data;
        }

        return twitchSubs.some(sub => sub.user_id === twitchAccount.id);
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

        if (subpoints.data) {
            twitchSubs = subpoints.data.subbers;
            return await strapi.services['twitch-subs'].createOrUpdate({ data: twitchSubs });
        }
    }
};