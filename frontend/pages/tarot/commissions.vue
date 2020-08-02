<template>
    <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
    <b-container v-else class="py-5">
        <header class="text-center mb-5">
            <h1 :class="['display-3', { 'sub-heading': !subTitle }]">{{ title }}</h1>
            <h5 v-if="subTitle" class="text-muted sub-heading">{{ subTitle }}</h5>
        </header>
        <div v-html="$md.render(content)"></div>
    </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import commissionsQuery from '~/apollo/queries/pages/commissions.gql';

export default {
    head() {
        return { title: this.title };
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
        }
    },
    components: {
        LoadingComponent
    }
}
</script>