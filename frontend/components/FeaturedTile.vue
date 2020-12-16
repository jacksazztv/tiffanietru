<template>
    <div class="featured-post">
        <b-img-lazy class="featured-post-background" :src="apiUrl + post.image.url" :width="post.image.width" :height="post.image.height" :alt="post.title"></b-img-lazy>
        <div class="featured-post-content">
            <ul class="d-flex flex-wrap list-unstyled m-0 p-0">
                <li v-for="tag in post.tags" class="featured-tag" :key="tag.id">
                    <b-button :to="`/writings/tag/${tag.name}`" class="rounded-0 mr-1 mb-1" variant="primary" size="sm">{{ tag.name }}</b-button>
                </li>
            </ul>
            <nuxt-link draggable="false" class="featured-link" :to="`/writings/${post.slug}`" :title="post.title">
                <component :is="primary ? 'h3' : 'h4'" class="featured-title">
                    {{ post.title }}
                </component>
            </nuxt-link>
        </div>
    </div>
</template>

<style scoped>
.featured-post {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 56.25%;
    margin: 0 2px;
}

.featured-post-background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
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

.featured-tag {
    position: relative;
    z-index: 2;
}

.featured-link {
    text-decoration: none;
}

.featured-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
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