module.exports = {
    query: `
        shopItemBySlug(slug: String!): ShopItem!
    `,
    resolver: {
        Query: {
            shopItemBySlug: {
                description: 'Find shop item by slug',
                resolverOf: 'application::shop-item.shop-item.findOne',
                resolver: async(obj, options, ctx) => {
                    return await strapi.api['shop-item'].services['shop-item'].findOne({slug: options.slug});
                }
            }
        }
    }
}