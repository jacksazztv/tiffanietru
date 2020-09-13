<template>
    <div id="paypal-button-container"></div>
</template>

<script>
export default {
    props: {
        price: Number,
    },
    mounted() {
        paypal.Buttons({
            createOrder(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '1'
                        }
                    }]
                });
            }
        }).render('#paypal-button-container');
    }
}
</script>