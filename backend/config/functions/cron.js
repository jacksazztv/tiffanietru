'use strict';

module.exports = {
  /**
   * Update sub data every day at midnight
   */
  '0 0 * * *': () => {
    console.log('Updating twitch subs...');
    strapi.services['twitch-subs'].fetchSubData();
  }
};
