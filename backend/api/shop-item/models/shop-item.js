'use strict';

const md = require('markdown-it')();
const excerptHtml = require('excerpt-html');

module.exports = {
    lifecycles: {
        async beforeCreate(data) {
            if (data.description) {
                data.excerpt = excerptHtml(md.render(data.description));
            }
        },
        async beforeUpdate(params, data) {
            if (data.description) {
                data.excerpt = excerptHtml(md.render(data.description));
            }
        }
    }
};