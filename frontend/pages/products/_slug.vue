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
                    <span :class="{ 'discount-price': twitchDiscount }">{{ displayPrice }}</span>
                    <span v-if="twitchDiscount" class="text-success">{{ displayDiscountPrice }}</span>
                </p>
                <div class="mb-4" v-html="$md.render(description)"></div>
                <PaypalButtons></PaypalButtons>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import PaypalButtons from '~/components/PaypalButtons.vue';
import seoQuery from '~/apollo/queries/seo/seo.gql';
import shopItemQuery from '~/apollo/queries/shop-item/shop-item.gql';

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
        displayPrice() {
            return '$' + (this.price / 100).toFixed(2);
        },
        displayDiscountPrice() {
            return '$' + ((this.price - Math.floor(this.price * 0.10)) / 100).toFixed(2);
        }
    },
    data() {
        return {
            title: '',
            description: '',
            productImage: {},
            price: '',
            apiUrl: process.env.strapiBaseUri,
            seo: {},
            twitchDiscount: true
        };
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
                }
            }
        },
        seo: {
            prefetch: true,
            query: seoQuery
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
</style>