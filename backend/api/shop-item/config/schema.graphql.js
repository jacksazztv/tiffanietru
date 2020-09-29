module.exports = {
    query: `
        shopItemBySlug(slug: String!): ShopItem!
        cartItems(ids: [Int]!): [ShopItem]!
    `,
    resolver: {
        Query: {
            shopItemBySlug: {
                description: 'Find shop item by slug',
                resolverOf: 'application::shop-item.shop-item.findOne',
                resolver: 'application::shop-item.shop-item.findBySlug'
            },
            cartItems: {
                description: 'Retrieve items in cart',
                resolverOf: 'application::shop-item.shop-item.find',
                resolver: 'application::shop-item.shop-item.findCartItems'
            }
        }
    }
}