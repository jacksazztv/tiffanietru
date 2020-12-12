<template>
    <div class="featured-post" 
        :style="{backgroundImage: `url(${apiUrl + post.image.url})`}">
        <nuxt-link draggable="false" :to="`/writings/${post.slug}`">
            <div class="featured-post-content">
                <ul class="d-flex list-unstyled p-0 m-0">
                    <li v-for="tag in post.tags" :key="tag.id">
                        <b-button :to="`/writings/tag/${tag.name}`" class="rounded-0 mr-1" variant="primary" size="sm">{{ tag.name }}</b-button>
                    </li>
                </ul>
                <h4 class="text-white mb-0">
                    {{ post.title }}
                </h4>
            </div>
        </nuxt-link>
    </div>
</template>

<style scoped>
.featured-post {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 56.25%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin: 0 2px;
}

.featured-post-content {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-in-out;
    overflow: hidden;
      /* These are technically the same, but use both */
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;
    /* This is the dangerous one in WebKit, as it breaks things wherever */
    word-break: break-all;
    /* Instead use this non-standard one: */
    word-break: break-word;

    /* Adds a hyphen where the word breaks, if supported (No Blink) */
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
}

.featured-post-content:hover {
    background: rgba(0, 0, 0, 0.3);
}
</style>

<script>
export default {
    props: {
        post: Object
    },
    data() {
        return {
            apiUrl: process.env.strapiBaseUri
        };
    }
}
</script>