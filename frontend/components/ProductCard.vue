<template>
    <b-card
        no-body
        tag="article"
        sub-title-tag="p"
        class="overflow-hidden text-center w-100 shadow-sm mb-4">

        <nuxt-link class="product-link" :to="`/products/${product.slug}`">
            <div class="aspect-ratio-box">
                <div class="aspect-ratio-box-inner">
                    <b-card-img-lazy 
                        class="d-block rounded-0 w-100"
                        :src="apiUrl + product.image.url"
                        :width="product.image.width" 
                        :height="product.image.height" 
                        :alt="product.name">
                    </b-card-img-lazy>
                </div>
            </div>
        </nuxt-link>

        <b-card-body>
            <b-card-title>
                <nuxt-link class="product-link" :to="`/products/${product.slug}`">
                    {{ product.name }}
                </nuxt-link>
            </b-card-title>
            <b-card-sub-title sub-title-tag="p" class="mb-2">
                <span :class="{ 'discount-price': showDiscount }">{{ normalPrice }}</span>
                <span v-if="showDiscount" class="text-success">{{ discountPrice }}</span>
            </b-card-sub-title>
            
            <b-button v-if="!itemInCart" @click="addToCart(product)" variant="primary" class="text-uppercase">Add to Cart</b-button>
            <b-button v-else @click="removeAll(product)" variant="danger" class="text-uppercase">Remove from Cart</b-button>

        </b-card-body>
    </b-card>
</template>

<script>
import twitchUserQuery from '~/apollo/queries/twitch-user/twitch-user.gql';
import { mapMutations } from 'vuex';

export default {
    computed: {
        showDiscount() {
            return this.twitchUser.subscribed && this.product.subDiscount > 0;
        },
        normalPrice() {
            const nf = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            });

            return nf.format(this.product.price / 100)
        },
        discountPrice() {
            const nf = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            });

            const discount = Math.floor(this.product.price * (this.product.subDiscount / 100));
            return nf.format((this.product.price - discount) / 100);
        },
        cartItems() {
            return this.$store.getters['cart/items'];
        },
        itemInCart() {
            return this.cartItems.some(item => item.id === this.product.id);
        }
    },
    data() {
        return {
            apiUrl: process.env.strapiBaseUri,
            twitchUser: {}
        };
    },
    methods : {
        ...mapMutations({
            addToCart: 'cart/add',
            removeFromCart: 'cart/remove',
            removeAll: 'cart/removeAll'
        })
    },
    props: {
        product: Object
    },
    apollo: {
        twitchUser: {
            prefetch: true,
            query: twitchUserQuery
        }
    }
}
</script>

<style scoped>
.discount-price {
    text-decoration: line-through;
}

.aspect-ratio-box {
    position: relative;
    height: 0;
    padding-top: 56.25%; /* 16:9 */
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.03);
}

.aspect-ratio-box-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.card-img {
    object-fit: contain;
    transition: opacity 0.2s ease-in-out;
}

.product-link {
    text-decoration: none;
}

.product-link:hover .card-img {
    opacity: 0.75;
}
</style>