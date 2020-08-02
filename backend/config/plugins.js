module.exports = ({ env }) => ({
    email: {
        provider: 'sendgrid',
        providerOptions: {
            apiKey: env('SENDGRID_KEY', ''),
        },
        settings: {
            defaultFrom: 'no-reply@tiffanietru.com',
            defaultReplyTo: 'no-reply@tiffanietru.com',
        },
    },
});
