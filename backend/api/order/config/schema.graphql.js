module.exports = {
    query: `
        myOrders: [Order]!
    `,
    resolver: {
        Query: {
            myOrders: {
                description: "Return the user's orders",
                resolver: 'application::order.order.findMyOrders'
            }
        }
    }
}