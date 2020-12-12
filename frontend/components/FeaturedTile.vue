<template>
    <div class="featured-post" 
        :style="{backgroundImage: `url(${apiUrl + post.image.url})`}">
        <nuxt-link draggable="false" :to="`/writings/${post.slug}`" :title="post.title">
            <div class="featured-post-content">
                <ul class="d-flex flex-wrap list-unstyled p-0 m-0">
                    <li v-for="tag in post.tags" :key="tag.id">
                        <b-button :to="`/writings/tag/${tag.name}`" class="rounded-0 mr-1 mb-1" variant="primary" size="sm">{{ tag.name }}</b-button>
                    </li>
                </ul>
                <component :is="primary ? 'h3' : 'h4'" class="featured-title">
                    {{ post.title }}
                </component>
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
}

.featured-post-content:hover {
    background: rgba(0, 0, 0, 0.3);
}

.featured-title {
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 0;
}
</style>

<script>
export default {
    props: {
        post: Object,
        primary: Boolean
    },
    data() {
        return {
            apiUrl: process.env.strapiBaseUri
        };
    }
}
</script>