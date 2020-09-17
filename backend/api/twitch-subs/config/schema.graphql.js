module.exports = {
    definition: `
        type TwitchUser {
            subscribed: Boolean!
        }
    `,
    query: `
        twitchUser: TwitchUser!
    `,
    resolver: {
        Query: {
            twitchUser: {
                description: 'Return twitch sub status',
                resolverOf: 'application::shop-item.shop-item.findOne',
                resolver: 'application::twitch-subs.twitch-subs.findTwitchUser'
            }
        }
    }
}