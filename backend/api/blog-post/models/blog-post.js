'use strict';

const md = require('markdown-it')();
const excerptHtml = require('excerpt-html');

module.exports = {
    lifecycles: {
        async beforeCreate(data) {
            if (data.content) {
                data.excerpt = excerptHtml(md.render(data.content));
            }
        },
        async beforeUpdate(params, data) {
            if (data.content) {
                data.excerpt = excerptHtml(md.render(data.content));
            }
        }
    }
};
