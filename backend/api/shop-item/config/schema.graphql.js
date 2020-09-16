module.exports = {
    query: `
        shopItemBySlug(slug: String!): ShopItem!
    `,
    resolver: {
        Query: {
            shopItemBySlug: {
                description: 'Find shop item by slug',
                resolverOf: 'application::shop-item.shop-item.findOne',
                resolver: 'application::shop-item.shop-item.findBySlug'
            }
        }
    }
}