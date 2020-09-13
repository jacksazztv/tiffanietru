<template>
    <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
    <div v-else>
        <b-container class="py-5 text-center">
            <section>
                <header class="mb-5">
                    <h1 :class="['display-3', { 'sub-heading': !subTitle }]">
                        {{ title }}
                        <small v-if="subTitle" class="text-muted sub-heading">{{ subTitle }}</small>
                    </h1>
                </header>
                
                <div v-html="$md.render(content)"></div>

            </section>
        </b-container>
        <div class="py-5 bg-light">
            <b-container>
                <b-row class="justify-content-center">
                    <b-col sm="3" v-for="product in shopItems" :key="product.id">
                        <ProductCard :product="product"></ProductCard>
                    </b-col>
                </b-row>
            </b-container>
        </div>
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
            query: shopItemsQuery
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