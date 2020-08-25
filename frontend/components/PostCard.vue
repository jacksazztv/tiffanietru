<template>
    <b-card v-if="responsive"
        no-body
        tag="article"
        class="overflow-hidden shadow-sm mb-4">
        <b-row no-gutters>
            <b-col lg="6">
                <nuxt-link :to="`/writings/${slug}`">
                    <b-card-img-lazy :width="imgWidth" :height="imgHeight" :src="imgSrc" alt="Image" class="rounded-0 h-100"></b-card-img-lazy>
                </nuxt-link>
            </b-col>
            <b-col lg="6" class="d-flex flex-column">
                <b-card-body class="flex-shrink-0">
                    <b-card-title>
                        <nuxt-link :title="title" class="text-decoration-none" :to="`/writings/${slug}`">{{ title }}</nuxt-link>
                    </b-card-title>
                    <b-card-sub-title sub-title-tag="time" :datetime="subTitle" class="d-block mb-2">{{ $dayjs(subTitle).format('MMM D, YYYY') }}</b-card-sub-title>
                    <div class="position-relative">
                        <b-card-text v-html="cardBody"></b-card-text>
                        <div class="read-more"></div>
                    </div>
                </b-card-body>
                <b-card-footer v-if="tags.length" class="mt-auto">
                    <ul class="list-unstyled mb-0 d-flex flex-row">
                        <li v-for="tag in tags" :key="tag.name" class="mr-1">
                            <b-button :to="`/writings/tag/${tag.name}`" class="text-white" variant="primary" size="sm">{{ tag.name }}</b-button>
                        </li>
                    </ul>
                </b-card-footer>
            </b-col>
        </b-row>
    </b-card>
    <b-card v-else
        no-body
        tag="article"
        class="overflow-hidden w-100 shadow-sm mb-4">

        
        <nuxt-link :to="`/writings/${slug}`">
            <div class="aspect-ratio-box">
                <div class="aspect-ratio-box-inner">
                    <b-card-img-lazy :width="imgWidth" :height="imgHeight" :src="imgSrc" alt="Image" class="rounded-0 d-block w-100" fluid></b-card-img-lazy>
                </div>
            </div>
        </nuxt-link>


        <b-card-body>
            <b-card-title>
                <nuxt-link :title="title" class="text-decoration-none" :to="`/writings/${slug}`">{{ title }}</nuxt-link>
            </b-card-title>
            <b-card-sub-title sub-title-tag="time" :datetime="subTitle" class="d-block mb-2">{{ $dayjs(subTitle).format('MMM D, YYYY') }}</b-card-sub-title>
            <div class="position-relative">
                <b-card-text v-html="cardBody"></b-card-text>
                <div class="read-more"></div>
            </div>
        </b-card-body>

        <b-card-footer v-if="tags.length" class="mt-auto">
            <ul class="list-unstyled mb-0 d-flex flex-row">
                <li v-for="tag in tags" :key="tag.name" class="mr-1">
                    <b-button :to="`/writings/tag/${tag.name}`" class="text-white" variant="primary" size="sm">{{ tag.name }}</b-button>
                </li>
            </ul>
        </b-card-footer>
    </b-card>
</template>

<script>
export default {
    computed: {
        cardBody() {
            if (!this.highlightText) {
                return this.text;
            }
            return this.text.replace(new RegExp(this.highlightText, 'gi'), match => {
                return '<mark>' + match + '</mark>';
            });
        }
    },
    props: {
        imgSrc: String,
        imgWidth: Number,
        imgHeight: Number,
        slug: String,
        title: String,
        subTitle: String,
        text: String,
        highlightText: String,
        tags: Array,
        responsive: Boolean
    }
}
</script>

<style scoped>
.aspect-ratio-box {
    position: relative;
    height: 0;
    padding-top: 56.25%; /* 16:9 */
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.03);
}

.aspect-ratio-box-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.card-img {
    object-fit: cover !important;
    transition: opacity 0.2s ease-in-out;
}

.card-img:hover {
    opacity: 0.75;
}

.card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-text {
    margin-bottom: 0 !important;
}

.read-more {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    height: 2rem;
    background-image: linear-gradient(to bottom, transparent, white);
}
</style>
