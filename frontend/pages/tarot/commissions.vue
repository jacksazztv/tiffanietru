<template>
    <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
    <b-container v-else class="py-5">
        <section>
            <header class="text-center mb-5">
                <h1 :class="['display-3', { 'sub-heading': !subTitle }]">{{ title }}</h1>
                <h2 v-if="subTitle" class="h5 text-muted sub-heading">{{ subTitle }}</h2>
            </header>
            <div v-html="$md.render(content)"></div>
        </section>
    </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import commissionsQuery from '~/apollo/queries/pages/commissions.gql';
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
            ]
        };
    },
    data() {
        return {
            title: '',
            subTitle: '',
            content: '',
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
        seo: {
            prefetch: true,
            query: seoQuery,
        }
    },
    components: {
        LoadingComponent
    }
}
</script>