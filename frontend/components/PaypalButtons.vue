<template>
    <div id="paypal-button-container"></div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapMutations } from 'vuex';

export default {
    props: {
        items: Array
    },
    data() {
        return {
            apiUrl: process.env.strapiBaseUri
        };
    },
    methods: {
        renderPaypalButtons() {
            paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'pill',
                    label: 'pay'
                },
                createOrder: this.createPaypalTransaction,
                onApprove: this.capturePaypalOrder
            }).render('#paypal-button-container');
        },
        createPaypalTransaction(data, actions) {
            const token = Cookies.get('apollo-token');
            
            let headers = {
                'Content-Type': 'application/json'
            };

            if (token) {
                headers = {
                    ...headers,
                    Authorization: `Bearer ${token}`
                };
            }

            return fetch(`${this.apiUrl}/orders/create-paypal-transaction`,
                {
                    method: 'post',
                    headers: headers,
                    body: JSON.stringify({ items: this.items }),
                })
                .then(res => res.json())
                .then(data => data.orderID);
        },
        capturePaypalOrder(data) {
            const token = Cookies.get('apollo-token');

            let headers = {
                'Content-Type': 'application/json'
            };

            if (token) {
                headers = {
                    ...headers,
                    Authorization: `Bearer ${token}`
                };
            }

            return fetch(`${this.apiUrl}/orders/capture-paypal-order`,
                {
                    method: 'post',
                    headers: headers,
                    body: JSON.stringify({ 
                        orderID: data.orderID,
                        items: this.items
                    })
                })
                .then(res => res.json())
                .then(details => {
                    this.emptyCart();
                    alert(JSON.stringify(details));
                });
        },
        ...mapMutations({
            emptyCart: 'cart/emptyList'
        })
    },
    head() {
        return {
            script: [
                {
                    hid: 'paypal',
                    src: 'https://www.paypal.com/sdk/js?client-id=sb&currency=USD&disable-funding=credit,card',
                    defer: true,
                    callback: this.renderPaypalButtons
                }
            ]
        }
    }
}
</script>