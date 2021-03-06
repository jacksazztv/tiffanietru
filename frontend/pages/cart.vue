<template>
    <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
    <div v-else class="py-4">
        <b-container>
            <h1 class="display-3 sub-heading mb-4">{{ title }}</h1>
            <b-form v-if="cartItemsWithQuantity.length"
                @submit.stop.prevent="onSubmit">

                <b-card v-for="product in cartItemsWithQuantity"
                    :key="product.id"
                    class="shadow-sm mb-4">
                    <div class="d-flex">

                        <div class="d-none d-sm-block align-self-start">
                            <nuxt-link :to="`/products/${product.slug}`">
                                <b-img class="mr-3" width="120" :src="apiUrl + product.image.url" :alt="product.name"></b-img>
                            </nuxt-link>
                        </div>

                        <div class="product-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4>
                                    <b-img :src="apiUrl + product.image.url" width="32" class="d-sm-none rounded-circle"></b-img>
                                    {{ product.name }}
                                </h4>

                                <b-button @click="removeAll(product)"
                                    variant="outline-danger"
                                    class="align-self-start"
                                    size="sm">
                                    <font-awesome-icon :icon="['fa', 'trash-alt']" />
                                </b-button>
                            </div>

                            <b-card-text class="text-muted">
                                {{ product.excerpt }}
                            </b-card-text>

                            <ul class="list-unstyled mb-0">
                                <li v-for="field in product.customFields" :key="field.id" class="mb-3">
                                    <div v-if="field.type === 'textmultiline'">
                                        <label :for="`data${field.id}`" class="text-muted">{{ field.title }} <span v-if="field.required" class="text-danger">*</span></label>
                                        <b-form-textarea :id="`data${field.id}`" 
                                            :required="field.required" 
                                            :placeholder="field.placeholder"
                                            v-model="form[`data${field.id}`]">
                                        </b-form-textarea>
                                    </div>
                                    <div v-else>
                                        <label :for="`data${field.id}`" class="text-muted">{{ field.title }} <span v-if="field.required" class="text-danger">*</span></label>
                                        <b-form-input :id="`data${field.id}`" 
                                            :type="field.type" 
                                            :placeholder="field.placeholder" 
                                            :required="field.required"
                                            v-model="form[`data${field.id}`]">
                                        </b-form-input>
                                    </div>
                                </li>
                            </ul>

                            <div class="d-flex align-items-end justify-content-between">

                                <div class="quantity-buttons">
                                    <span class="text-muted">Quantity</span>
                                    <div class="d-flex align-items-center justify-content-between border rounded">
                                        <b-button @click="removeFromCart(product)" variant="transparent" class="text-muted">
                                            <font-awesome-icon :icon="['fa', 'minus']" />
                                        </b-button>

                                        <span>{{ product.quantity }}</span>

                                        <b-button @click="addToCart(product)" variant="transparent" class="text-muted">
                                            <font-awesome-icon :icon="['fa', 'plus']" />
                                        </b-button>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <span :class="{'discount-price': twitchUser.subscribed && product.subDiscount > 0}">
                                            {{ formatMoney((product.quantity * product.price) / 100) }}
                                        </span>
                                    </div>
                                    <div>
                                        <span v-if="twitchUser.subscribed && product.subDiscount > 0" class="text-success">
                                            {{ formatMoney(calculatePrice(product)) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-card>

                <b-row>
                    <b-col sm="7">
                        PROMO CODE
                    </b-col>
                    <b-col sm="5" style="min-height: 100px">
                        <div class="d-flex justify-content-between mb-4">
                            <span class="font-weight-bold">Total</span>
                            <span>{{ totalCost }}</span>
                        </div>
                        <b-button v-if="!showPaypalBtn" type="submit" variant="primary" class="purchase-btn" pill block>Buy Items</b-button>
                        <PaypalButtons v-else :items="cartItemsWithQuantity"></PaypalButtons>
                    </b-col>
                </b-row>
            </b-form>
            <div v-else class="text-center mb-5">
                <p class="no-items-text text-muted">Your cart is currently empty.</p>
                <b-button variant="primary" class="text-uppercase" to="/commissions">Back to Commissions</b-button>
            </div>
        </b-container>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import seoQuery from '~/apollo/queries/seo/seo.gql';
import twitchUserQuery from '~/apollo/queries/twitch-user/twitch-user.gql';
import cartItemsQuery from '~/apollo/queries/shop-item/cart-items.gql';
import PaypalButtons from '~/components/PaypalButtons.vue';
import LoadingComponent from '~/components/LoadingComponent.vue';

export default {
    head() {
        return {
            title: `${this.title} - ${this.seo.siteName}`,
            meta: [
                {
                    hid: 'og-title',
                    property: 'og:title',
                    content: `${this.title} - ${this.seo.siteName}`
                }
            ],
        };
    },
    computed: {
        cartItemsWithQuantity() {
            return this.cartItems.map(item => {
                const qItem = this.$store.getters['cart/items'].find(i => i.id == item.id);;
                if (qItem) {
                    return {
                        quantity: qItem.quantity,
                        ...item
                    };
                }
                return {
                    quantity: 1,
                    ...item
                }
            });
        },
        totalCost() {
            const amount = this.cartItemsWithQuantity.reduce((accumulator, item) => {
                let discount = 0;
                if (this.twitchUser.subscribed && item.subDiscount > 0) {
                    discount = Math.floor(item.price * (item.subDiscount / 100));
                }
                return item.quantity * item.price - discount + accumulator;
            }, 0);
            return this.formatMoney(amount / 100);
        }
    },
    methods: {
        formatMoney(amount) {
            const nf = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            });

            return nf.format(amount);
        },
        calculatePrice(product) {
            let discount = 0;
            if (this.twitchUser.subscribed && product.subDiscount > 0) {
                discount = Math.floor(product.price * (product.subDiscount / 100));
            }
            return ((product.quantity * product.price - discount) / 100);
        },
        onSubmit() {
            this.showPaypalBtn = true;
        },
        ...mapMutations({
            addToCart: 'cart/add',
            removeFromCart: 'cart/remove',
            removeAll: 'cart/removeAll'
        })
    },
    data() {
        return {
            title: 'Cart',
            seo: {},
            form: {},
            twitchUser: {},
            cartItems: [],
            apiUrl: process.env.strapiBaseUri,
            showPaypalBtn: false
        };
    },
    apollo: {
        seo: {
            prefetch: true,
            query: seoQuery
        },
        twitchUser: {
            prefetch: true,
            query: twitchUserQuery
        },
        cartItems: {
            prefetch: true,
            query: cartItemsQuery,
            variables() {
                return {
                    ids: this.$store.getters['cart/items'].map(item => +item.id)
                };
            },
        }
    },
    components: {
        PaypalButtons,
        LoadingComponent
    }
}
</script>

<style scoped>
.product-body {
    flex: 1;
}

.discount-price {
    text-decoration: line-through;
}

.quantity-buttons {
    flex: 0 1 100px;
}

.purchase-btn {
    text-transform: uppercase;
    padding: 0.5rem;
}

.no-items-text {
    font-size: 2rem;
} 
</style>