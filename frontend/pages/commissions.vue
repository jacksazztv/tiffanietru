<template>
    <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
    <div v-else>
        <section>
            <b-container class="py-4">
                <header class="mb-4">
                    <h1 :class="['display-3', { 'sub-heading': !subTitle }]">
                        {{ title }}
                        <small v-if="subTitle" class="text-muted sub-heading">{{ subTitle }}</small>
                    </h1>
                </header>
                
                <div class="lead content" v-html="$md.render(content)"></div>
            </b-container>
            <b-container class="py-4 bg-light overflow-hidden" fluid>
                <b-row class="justify-content-center">
                    <b-col sm="3" class="d-flex align-items-stretch" v-for="product in shopItems" :key="product.id">
                        <ProductCard 
                            v-scrollanimation="'fadeInUp'"
                            class="animated"
                            :product="product">
                        </ProductCard>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import ProductCard from '~/components/ProductCard.vue';
import commissionsQuery from '~/apollo/queries/pages/commissions.gql';
import shopItemsQuery from '~/apollo/queries/shop-item/shop-items.gql';
import seoQuery from '~/apollo/queries/seo/seo.gql';

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
    data() {
        return {
            title: '',
            subTitle: '',
            content: '',
            apiUrl: process.env.strapiBaseUri,
            seo: {},
        };
    },
    apollo: {
        commission: {
            prefetch: true,
            query: commissionsQuery,
            result(result) {
                if (result.data.commission) {
                    this.title = result.data.commission.title;
                    this.subTitle = result.data.commission.subtitle;
                    this.content = result.data.commission.content;
                }
            }
        },
        shopItems: {
            prefetch: true,
            query: shopItemsQuery,
        },
        seo: {
            prefetch: true,
            query: seoQuery
        }
    },
    components: {
        LoadingComponent,
        ProductCard
    }
}
</script>

<style scoped>
.content {
    max-width: 800px;
    margin: auto;
    text-align: center;
}
</style>