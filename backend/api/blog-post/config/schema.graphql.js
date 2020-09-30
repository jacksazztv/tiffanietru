module.exports = {
    query: `
        blogSearch(q: String, sort: String, start: Int, limit: Int): [BlogPost]!
        blogSearchCount(q: String): Int!
        blogPostBySlug(slug: String!): BlogPost
    `,
    resolver: {
        Query: {
            blogSearch: {
                description: 'Search the blog posts',
                resolverOf: 'application::blog-post.blog-post.find',
                resolver: async(obj, options, ctx) => {
                    const params = {
                        _q: options.q,
                        _sort: options.sort,
                        _start: options.start,
                        _limit: options.limit
                    };
                    return await strapi.api['blog-post'].services['blog-post'].search(params);
                }
            },
            blogSearchCount: {
                description: 'Return the total number of blog posts that match a search query',
                resolverOf: 'application::blog-post.blog-post.count',
                resolver: async(obj, options, ctx) => {
                    return await strapi.api['blog-post'].services['blog-post'].countSearch({_q: options.q});
                }
            },
            blogPostBySlug: {
                description: 'Find blog post by slug',
                resolverOf: 'application::blog-post.blog-post.findOne',
                resolver: async(obj, options, ctx) => {
                    return await strapi.api['blog-post'].services['blog-post'].findOne({slug: options.slug});
                }
            }
        }
    }
}