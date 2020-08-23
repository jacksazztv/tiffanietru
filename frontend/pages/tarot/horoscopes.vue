<template>
    <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
    <b-container v-else class="py-5">
        <section>
            <header class="text-center mb-5">
                <h1 :class="['display-3', { 'sub-heading': !subTitle }]">
                    {{ title }}
                    <small v-if="subTitle" class="sub-heading text-muted">{{ subTitle }}</small>
                </h1>
            </header>

            <div v-html="$md.render(content)"></div>
        </section>
    </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import horoscopesQuery from '~/apollo/queries/pages/horoscopes.gql';
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
            seo: {},
        };
    },
    apollo: {
        horoscope: {
            prefetch: true,
            query: horoscopesQuery,
            result(result) {
                if (result.data.horoscope) {
                    this.title = result.data.horoscope.title;
                    this.subTitle = result.data.horoscope.subtitle;
                    this.content = result.data.horoscope.content;
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
    }
}
</script>