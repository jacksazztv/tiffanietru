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

            <div v-html="$md.render(content)" class="mb-5"></div>

            <b-carousel
                id="testimonial-slider"
                controls
                indicators
                img-width="2560"
                img-height="1600">

                <b-carousel-slide class="active">

                    <template v-slot:img>
                        <div style="position: relative">
                            <b-img 
                                src="~/assets/tarotbg.jpg"
                                width="2560"
                                height="1600"
                                alt="Tarot BG"
                                class="d-block w-100"
                                fluid>
                            </b-img>
                            <TarotDeck></TarotDeck>
                        </div>
                    </template>

                </b-carousel-slide>

            </b-carousel>
        </section>
    </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import TarotDeck from '~/components/TarotDeck.vue';
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
        TarotDeck
    }
}
</script>