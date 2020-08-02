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
import testimonialsQuery from '~/apollo/queries/pages/testimonials.gql';

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
        testimonial: {
            prefetch: true,
            query: testimonialsQuery,
            result(result) {
                if (result.data.testimonial) {
                    this.title = result.data.testimonial.title;
                    this.subTitle = result.data.testimonial.subTitle;
                    this.content = result.data.testimonial.content;
                }
            }
        }
    },
    components: {
        LoadingComponent
    }
}
</script>