<template>
    <div v-if="$apollo.loading">
        <b-jumbotron fluid>
            <section>
                <header class="text-center mb-5">
                    <h1 class="display-3">
                        Writings
                        <small class="sub-heading text-muted">My Blog</small>
                    </h1>
                </header>
                <b-row>
                    <b-col class="d-flex align-items-stretch" v-for="i in 3" :key="i" sm>
                        <PostCardSkeleton class="flex-grow-1"></PostCardSkeleton>
                    </b-col>
                </b-row>
            </section>
        </b-jumbotron>
        <b-container class="my-5">
            <b-row>
                <b-col sm="8">
                    <PostCardSkeleton v-for="i in 3" :key="i" responsive></PostCardSkeleton>
                </b-col>
                <b-col sm="4">
                    <PostCardSkeleton></PostCardSkeleton>
                </b-col>
            </b-row>
        </b-container>
    </div>
    <div v-else>
        <b-jumbotron v-if="featuredPosts.length" fluid>
            <section>
                <header class="text-center mb-5">
                    <h1 :class="['display-3', { 'sub-heading': !subTitle }]">
                        {{ title }}
                        <small v-if="subTitle" class="sub-heading text-muted">{{ subTitle }}</small>
                    </h1>
                </header>
                <b-row>
                    <b-col class="d-flex align-items-stretch" v-for="blogPost in featuredPosts" :key="blogPost.id" md>
                        <PostCard
                            class="flex-grow-1"
                            :img-src="api_url + blogPost.image.url"
                            :img-width="blogPost.image.width"
                            :img-height="blogPost.image.height"
                            :title="blogPost.title"
                            :sub-title="blogPost.created_at"
                            :text="blogPost.excerpt"
                            :tags="blogPost.tags"
                            :slug="blogPost.slug">
                        </PostCard>
                    </b-col>
                </b-row>
            </section>
        </b-jumbotron>
        <b-container class="my-5">
            <header v-if="!featuredPosts.length" class="text-center mb-5">
                <h1 :class="['display-3', { 'sub-heading': !subTitle }]">
                    {{ title }}
                    <small v-if="subTitle" class="sub-heading text-muted">{{ subTitle }}</small>
                </h1>
            </header>
            <b-row>
                <b-col sm="8">
                    <section>
                        <PostCard v-for="blogPost in otherPosts" :key="blogPost.id"
                            :img-src="api_url + blogPost.image.url"
                            :img-width="blogPost.image.width"
                            :img-height="blogPost.image.height"
                            :title="blogPost.title"
                            :subTitle="blogPost.created_at"
                            :text="blogPost.excerpt"
                            :slug="blogPost.slug"
                            :tags="blogPost.tags"
                            responsive>
                        </PostCard>
                        <b-pagination-nav
                            v-if="numPages > 1"
                            align="center"
                            :link-gen="linkGen"
                            :number-of-pages="numPages">
                        </b-pagination-nav>
                    </section>
                </b-col>
                <b-col sm="4">
                    <Sidebar></Sidebar>
                </b-col> 
            </b-row>

        </b-container>
    </div>
</template>

<script>
import PostCard from '~/components/PostCard.vue';
import PostCardSkeleton from '~/components/PostCardSkeleton.vue';
import Sidebar from '~/components/Sidebar.vue';
import blogPostsQuery from '~/apollo/queries/blog-post/blog-posts.gql';
import writingsQuery from '~/apollo/queries/pages/writings.gql';
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
    computed: {
        featuredPosts() {
            if (this.page === 1 && this.blogPosts.length > 3) {
                return this.blogPosts.slice(0, 3);
            }
            return [];
        },
        otherPosts() {
            if (this.page === 1 && this.blogPosts.length > 3) {
                return this.blogPosts.slice(3);
            }
            return this.blogPosts;
        },
    },
    methods: {
        linkGen(page) {
            return page === 1 ? '?' : `?page=${page}`;
        }
    },
    data() {
        return {
            title: '',
            subTitle: '',
            blogPosts: [],
            numPages: 1,
            api_url: process.env.strapiBaseUri,
            page: +this.$route.query.page || 1,
            pageSize: 10,
            seo: {}
        }
    },
    apollo: {
        blogPosts: {
            prefetch: true,
            query: blogPostsQuery,
            variables() {
                return {
                    start: (this.page - 1) * this.pageSize,
                    limit: this.pageSize
                };
            },
            result(result) {
                this.blogPosts = result.data.blogPosts;
                this.numPages = Math.ceil(result.data.blogPostsConnection.aggregate.count / this.pageSize);
            }
        },
        writing: {
            prefetch: true,
            query: writingsQuery,
            result(result) {
                if (result.data.writing) {
                    this.title = result.data.writing.title;
                    this.subTitle = result.data.writing.subtitle;
                }
            }
        },
        seo: {
            prefetch: true,
            query: seoQuery
        }
    },
    components: {
        PostCard,
        PostCardSkeleton,
        Sidebar,
    },
}
</script>