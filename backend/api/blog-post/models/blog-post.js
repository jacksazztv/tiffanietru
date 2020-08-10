'use strict';

const md = require('markdown-it')();
const excerptHtml = require('excerpt-html');

module.exports = {
    lifecycles: {
        async beforeCreate(data) {
            if (data.content) {
                data.excerpt = excerptHtml(md.render(data.content));
            }

            // Get the previous post
            const lastPost = await strapi.api['blog-post'].services['blog-post'].find({ 
                _limit: 1,
                _sort: 'created_at:desc'
            });

            if (lastPost && lastPost.length) {
                // Link to the previous post
                data.previous = lastPost[0].id;
            }
        },
        async beforeUpdate(params, data) {
            if (data.content) {
                data.excerpt = excerptHtml(md.render(data.content));
            }
        }
    }
};
