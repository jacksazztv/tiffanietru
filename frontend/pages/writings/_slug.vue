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
            script: [
                {
                    src: 'https://commento.tiffanietru.com/js/commento.js',
                    body: true,
                    defer: true
                }
            ]
        }
    }
}
</script>

<style>
.content img {
    max-width: 100%;
    height: auto;
}

.content blockquote {
    position: relative;
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    font-size: 1.25rem;
    font-style: italic;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
    quotes: "\201C""\201D""\2018""\2019";
}

.content blockquote:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
}

.content blockquote:after {
    color: #ccc;
    content: close-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    position: absolute;
    right: 0;
    bottom: -0.15em;
}

.content blockquote p {
    display: inline;
}
</style>