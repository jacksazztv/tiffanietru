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

            <div class="video-wrapper my-4 mx-lg-4 float-lg-right">
                <figure>
                    <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="https://www.youtube.com/embed/azJN192Nch0"
                        allowFullscreen>
                    </b-embed>
                    <figcaption class="text-center">My Tarot Reading for 2020</figcaption>
                </figure>
               
            </div>

            <div class="mb-4" v-html="$md.render(content)"></div>

            <div>
                <b-embed
                    type="iframe"
                    aspect="16by9"
                    src="https://clips.twitch.tv/embed?clip=HappyKnottyBibimbapFeelsBadMan&parent=tiffanietru.com&autoplay=false"
                    allowFullscreen>
                </b-embed>
            </div>
        </section>

    </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import tarotQuery from '~/apollo/queries/pages/whatis.gql';
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
            title : '',
            subTitle: '',
            content: '',
        };
    },
    apollo: {
        whatIsTarot: {
            prefetch: true,
            query: tarotQuery,
            result(result) {
                if (result.data.whatIsTarot) {
                    this.title = result.data.whatIsTarot.title;
                    this.subTitle = result.data.whatIsTarot.subtitle;
                    this.content = result.data.whatIsTarot.content;
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

<style scoped>
    .video-wrapper {
        width: 100%;
        max-width: 500px;
    }
</style>