<template>
    <b-container class="py-5">
        <b-row>
            <b-col sm="8">
                <div v-if="blogPost">
                    <header class="mb-4">
                        <h1 class="mb-0">{{ blogPost.title }}</h1>
                        <time class="d-block text-muted mb-2">{{ $dayjs(blogPost.created_at).format('MMM D YYYY, h:mma') }}</time>
                        <b-img :src="api_url + blogPost.image.url" alt="Image" fluid></b-img>
                    </header>
                    <div class="content" v-html="$md.render(blogPost.content)"></div>
                </div>
            </b-col>
            <b-col sm="4">
                <Sidebar></Sidebar>
            </b-col>
        </b-row> 
    </b-container>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue';
import blogPostQuery from '~/apollo/queries/blog-post/blog-post.gql';

export default {
    data() {
        return {
            title: '',
            blogPost: null,
            api_url: process.env.strapiBaseUri
        }
    },
    apollo: {
        blogPostBySlug: {
            prefetch: true,
            query: blogPostQuery,
            variables() {
                return { slug: this.$route.params.slug };
            },
            result(result) {
                if (result.data.blogPostBySlug) {
                    this.blogPost = result.data.blogPostBySlug;
                    this.title = result.data.blogPostBySlug.title;
                }
            }
        }
    },
    components: {
        Sidebar
    },
    head() {
        return {
            title: this.title
        }
    }
}
</script>

<style>
.content img {
    max-width: 100%;
    height: auto;
}
</style>