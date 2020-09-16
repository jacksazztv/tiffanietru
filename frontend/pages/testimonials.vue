<template>
    <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
    <b-container v-else class="py-5">
        <section>
            <header class="text-center mb-5">
                <h1 :class="['display-3', { 'sub-heading': !subTitle }]">
                    {{ title }}
                    <small v-if="subTitle" class="text-muted sub-heading">{{ subTitle }}</small>
                </h1>
            </header>

            <div v-html="$md.render(content)" class="lead content mb-5"></div>

            <TestimonialsSlider></TestimonialsSlider>
        </section>
    </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import TestimonialsSlider from '~/components/TestimonialsSlider.vue';
import testimonialsQuery from '~/apollo/queries/pages/testimonials.gql';
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
            seo: {}
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
        },
        seo: {
            prefetch: true,
            query: seoQuery
        }
    },
    components: {
        LoadingComponent,
        TestimonialsSlider
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