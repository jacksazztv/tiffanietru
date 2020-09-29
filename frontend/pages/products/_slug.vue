<template>
    <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
    <b-container v-else class="py-5">
        <b-row>
            <b-col sm="5">
                <b-img :src="apiUrl + productImage.url" :width="productImage.width" :height="productImage.height" :alt="title" fluid></b-img>
            </b-col>
            <b-col sm="7">
                <h1 class="mb-0">{{ title }}</h1>
                <p class="text-muted mb-4">
                    <span :class="{ 'discount-price': showDiscount }">{{ displayPrice }}</span>
                    <span v-if="showDiscount" class="text-success">{{ displayDiscountPrice }}</span>
                </p>
                <div class="mb-4" v-html="$md.render(description)"></div>

                <b-button v-if="!itemInCart" class="cart-btn" variant="primary" @click="addToCart(shopItemBySlug)" pill block>Add to Cart</b-button>
                <b-button v-else class="cart-btn" variant="danger" @click="removeAll(shopItemBySlug)" pill block>Remove from Cart</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import seoQuery from '~/apollo/queries/seo/seo.gql';
import shopItemQuery from '~/apollo/queries/shop-item/shop-item.gql';
import twitchUserQuery from '~/apollo/queries/twitch-user/twitch-user.gql';
import { mapMutations } from 'vuex';
import PaypalButtons from '~/components/PaypalButtons.vue';

export default {
    head() {
        return {
            title: `${this.title} - ${this.seo.siteName}`,
            meta: [
                {
                    hid: 'og-title',
                    property: 'og:title',
                    content: `${this.title} - ${this.seo.siteName}`
                },
                {
                    hid: 'og-description',
                    property: 'og:description',
                    content: this.description
                },
                {
                    hid: 'og-image',
                    property: 'og:image',
                    content: this.apiUrl + this.productImage.url
                }
            ],
        }
    },
    computed: {
        showDiscount() {
            return this.twitchUser.subscribed && this.price !== this.discountPrice;
        },
        displayPrice() {
            return '$' + (this.price / 100).toFixed(2);
        },
        displayDiscountPrice() {
            return '$' + (this.discountPrice / 100).toFixed(2);
        },
        cartItems() {
            return this.$store.getters['cart/items'];
        },
        itemInCart() {
            return this.cartItems.some(item => item.id === this.shopItemBySlug.id);
        }
    },
    data() {
        return {
            title: '',
            description: '',
            productImage: {},
            price: '',
            discountPrice: '',
            apiUrl: process.env.strapiBaseUri,
            seo: {},
            twitchUser: {}
        };
    },
    methods: {
        ...mapMutations({
            addToCart: 'cart/add',
            removeAll: 'cart/removeAll'
        })
    },
    apollo: {
        shopItemBySlug: {
            prefetch: true,
            query: shopItemQuery,
            variables() {
                return {
                    slug: this.$route.params.slug
                };
            },
            result(result) {
                if (result.data.shopItemBySlug) {
                    this.title = result.data.shopItemBySlug.name;
                    this.description = result.data.shopItemBySlug.description;
                    this.productImage = result.data.shopItemBySlug.image;
                    this.price = result.data.shopItemBySlug.price;
                    const discount = Math.floor(this.price * (result.data.shopItemBySlug.subDiscount / 100));
                    this.discountPrice = this.price - discount;
                }
            }
        },
        seo: {
            prefetch: true,
            query: seoQuery
        },
        twitchUser: {
            prefetch: true,
            query: twitchUserQuery
        }
    },
    components: {
        LoadingComponent,
        PaypalButtons
    }
}
</script>

<style scoped>
.discount-price {
    text-decoration: line-through;
}

.cart-btn {
    text-transform: uppercase;
    padding: 0.75rem;
}
</style>