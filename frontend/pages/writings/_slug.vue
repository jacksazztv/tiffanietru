<template>
    <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
    <b-container v-else class="py-5">
        <b-row>
            <b-col sm="8">
                <article class="mb-4">
                    <header class="mb-4">
                        <h1 class="mb-0">{{ blogPost.title }}</h1>
                        <time class="d-block text-muted mb-2" :datetime="blogPost.created_at">{{ $dayjs(blogPost.created_at).format('MMM D YYYY, h:mma') }}</time>
                        <b-img :width="blogPost.image.width" :height="blogPost.image.height" :src="api_url + blogPost.image.url" alt="Image" fluid></b-img>
                    </header>

                    <div class="content mb-4" v-html="$md.render(blogPost.content)"></div>

                    <section>
                        <h2 class="sub-heading">Comments</h2>
                        <Comments></Comments>
                    </section>
                </article>

                <nav class="post-nav py-3 mb-4 mb-sm-0">
                    <b-row>
                        <b-col v-if="blogPost.previous"  class="text-left">
                            <nuxt-link class="text-muted" :to="`/writings/${blogPost.previous.slug}`" rel="prev">
                                <small class="post-nav-label">
                                    <font-awesome-icon style="margin-bottom: 0.03rem;" :icon="['fa', 'angle-double-left']" /> Previous
                                </small>
                                <span class="post-nav-title">{{ blogPost.previous.title }}</span>
                            </nuxt-link>
                        </b-col>
                        <b-col v-if="blogPost.next" class="text-right">
                            <nuxt-link class="text-muted" :to="`/writings/${blogPost.next.slug}`" rel="next">
                                <small class="post-nav-label">
                                    Next <font-awesome-icon style="margin-bottom: 0.03rem;" :icon="['fa', 'angle-double-right']" />
                                </small>
                                <span class="post-nav-title">{{ blogPost.next.title }}</span>
                            </nuxt-link>
                        </b-col>
                    </b-row>
                </nav>
            </b-col>
            <b-col sm="4">
                <Sidebar></Sidebar>
            </b-col>
        </b-row> 
    </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import Sidebar from '~/components/Sidebar.vue';
import Comments from '~/components/Comments.vue';
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
            blogPost: {},
            api_url: process.env.strapiBaseUri,
            seo: {},
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
        LoadingComponent,
        Comments
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

.post-nav {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.post-nav a {
    text-decoration: none;
}

.post-nav-label {
    text-transform: uppercase;
    font-family: 'Oswald', sans-serif;
    letter-spacing: 0.5px;
}

.post-nav-title {
    display: block;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    text-transform: uppercase;
    transition: color 0.2s;
}

.post-nav a:hover .post-nav-title {
    color: #000;
}
</style>