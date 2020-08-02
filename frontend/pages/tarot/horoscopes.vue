<template>
    <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
    <b-container v-else class="py-5">
        <header class="text-center mb-5">
            <h1 :class="['display-3', { 'sub-heading': !subTitle }]">{{ title }}</h1>
            <h5 v-if="subTitle" class="sub-heading text-muted">{{ subTitle }}</h5>
        </header>

        <div v-html="$md.render(content)"></div>
    </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import horoscopesQuery from '~/apollo/queries/pages/horoscopes.gql';

export default {
    head() {
        return { title: this.title };
    },
    data() {
        return {
            title: '',
            subTitle: '',
            content: ''
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
        }
    },
    components: {
        LoadingComponent,
    }
}
</script>