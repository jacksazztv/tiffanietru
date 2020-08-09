<template>
    <b-container class="py-5">
        <b-row>
            <b-col sm="8">
                <article v-if="blogPost">
                    <header class="mb-4">
                        <h1 class="mb-0">{{ blogPost.title }}</h1>
                        <time class="d-block text-muted mb-2">{{ $dayjs(blogPost.created_at).format('MMM D YYYY, h:mma') }}</time>
                        <b-img :src="api_url + blogPost.image.url" alt="Image" fluid></b-img>
                    </header>

                    <div class="content mb-4" v-html="$md.render(blogPost.content)"></div>

                    <section>
                        <h2 class="sub-heading">Comments</h2>
                        <div id="commento"></div>
                    </section>
                </article>
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
import seoQuery from '~/apollo/queries/seo/seo.gql';

export default {
    computed: {
        username() {
            return this.$store.getters['auth/username'];
        }
    },
    data() {
        return {
            title: '',
            description: '',
            image: '',
            blogPost: null,
            api_url: process.env.strapiBaseUri,
        }
    },
    mounted() {
        // Load commento script.
        const commentScript = document.createElement('script');
        commentScript.setAttribute('src', 'https://commento.tiffanietru.com/js/commento.js');
        commentScript.defer = true;
        document.head.appendChild(commentScript);
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
                    this.description = result.data.blogPostBySlug.excerpt;
                    this.image = result.data.blogPostBySlug.image.url;
                }
            }
        },
        seo: {
            prefetch: true,
            query: seoQuery
        }
    },
    components: {
        Sidebar,
    },
    head() {
        return {
            title: `${this.title} - ${this.seo.siteName}`,
            meta: [
                {
                    hid: 'og-title',
                    property: 'og:title',
                    content: `${this.title} - ${this.seo.siteName}`
                },
                {
                    hid: 'og-description',
                    property: 'og:description',
                    content: this.description
                },
                {
                    hid: 'og-image',
                    property: 'og:image',
                    content: this.api_url + this.image
                }
            ],
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