<template>
    <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
    <div v-else>
        <b-jumbotron v-if="featuredPosts.length" fluid>
            <header class="text-center mb-5">
                <h1 :class="['display-3', { 'sub-heading': !subTitle }]">{{ title }}</h1>
                <h5 v-if="subTitle" class="sub-heading text-muted">{{ subTitle }}</h5>
            </header>
            <b-row>
                <b-col class="d-flex align-items-stretch" v-for="blogPost in featuredPosts" :key="blogPost.id" sm>
                    <PostCard
                        img-top
                        :img-src="api_url + blogPost.image.url"
                        :title="blogPost.title"
                        :sub-title="blogPost.created_at"
                        :text="blogPost.excerpt"
                        :tags="blogPost.tags"
                        :slug="blogPost.slug">
                    </PostCard>
                </b-col>
            </b-row>
        </b-jumbotron>
        <b-container class="pb-5">
            <b-row>
                <b-col sm="8">
                    <h2>Recent Posts</h2>
                    <PostCard v-for="blogPost in otherPosts" :key="blogPost.id"
                        :img-src="api_url + blogPost.image.url"
                        :title="blogPost.title"
                        :subTitle="blogPost.created_at"
                        :text="blogPost.excerpt"
                        :slug="blogPost.slug"
                        :tags="blogPost.tags"
                        responsive>
                    </PostCard>
                    <b-pagination-nav
                        v-if="numPages > 1"
                        :link-gen="linkGen"
                        :number-of-pages="numPages">
                    </b-pagination-nav>
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
import Sidebar from '~/components/Sidebar.vue';
import LoadingComponent from '~/components/LoadingComponent.vue';
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
            return this.page === 1 ? this.blogPosts.slice(0, 3) : [];
        },
        otherPosts() {
            return this.page === 1 ? this.blogPosts.slice(3) : this.blogPosts;
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
            page: parseInt(this.$route.query.page) || 1,
            pageSize: 25,
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
        Sidebar,
        LoadingComponent
    },
}
</script>