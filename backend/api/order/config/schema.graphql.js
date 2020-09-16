module.exports = {
    query: `
        myOrders: [Order]!
        myPortfolios: [Portfolio]!
    `,
    resolver: {
        Query: {
            myOrders: {
                description: "Return the user's orders",
                resolver: 'application::order.order.findMyOrders'
            },
            myPortfolios: {
                description: "Return the user's owned portfolios",
                resolver: 'application::order.order.findMyPortfolios'
            }
        }
    }
}