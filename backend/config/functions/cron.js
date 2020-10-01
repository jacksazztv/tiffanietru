'use strict';

module.exports = {
  /**
   * Update sub data every hour
   */
  '0 * * * *': () => {
    console.log('Updating twitch subs...');
    strapi.services['twitch-subs'].fetchSubData();
  }
};
