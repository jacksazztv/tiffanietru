<template>
    <div id="paypal-button-container"></div>
</template>

<script>
export default {
    head() {
        return {
            script: [
                {
                    hid: 'paypal',
                    src: 'https://www.paypal.com/sdk/js?client-id=sb&currency=USD',
                    'data-sdk-integration-source': 'button-factory',
                    defer: true
                },
                {
                    hid: 'paypal-buttons',
                    src: '/js/paypal-buttons.js',
                    defer: true
                }
            ]
        };
    }
}
</script>