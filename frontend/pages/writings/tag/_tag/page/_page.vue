<template>
    <b-container class="py-4">
        <header class="text-center mb-4">
            <h1 class="display-3 sub-heading">{{ title }}</h1>
        </header>
        <b-row>
            <b-col sm="8">
                <div v-if="$apollo.loading">
                    <PostCardSkeleton v-for="i in 3" :key="i" responsive></PostCardSkeleton>
                </div>
                <div v-else>
                    <div v-if="!blogPosts.length">
                        <h2>No results found</h2>
                    </div>
                    <PostCard v-for="blogPost in blogPosts" :key="blogPost.id"
                        v-scrollanimation
                        class="animated"
                        :img-src="api_url + blogPost.image.url"
                        :img-width="blogPost.image.width"
                        :img-height="blogPost.image.height"
                        :title="blogPost.title"
                        :sub-title="blogPost.created_at"
                        :text="blogPost.excerpt"
                        :slug="blogPost.slug"
                        :tags="blogPost.tags"
                        responsive>
                    </PostCard>
                    <b-pagination-nav
                        v-if="numPages > 1"
                        align="center"
                        :link-gen="linkGen"
                        :number-of-pages="numPages"
                        use-router>
                    </b-pagination-nav>
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
import PostCard from '~/components/PostCard.vue';
import PostCardSkeleton from '~/components/PostCardSkeleton.vue';
import tagQuery from '~/apollo/queries/blog-post/blog-posts-by-tag.gql';
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
    methods: {
        linkGen(page) {
            return page === 1 ? `/writings/tag/${this.$route.params.tag}` : `/writings/tag/${this.$route.params.tag}/page/${page}`;
        }
    },
    data() {
        return { 
            title: this.$route.params.tag,
            blogPosts: [],
            page: +this.$route.params.page || 1,
            numPages: 1,
            pageSize: 10,
            api_url: process.env.strapiBaseUri,
            seo: {},
        }
    },
    apollo: {
        blogPosts: {
            prefetch: true,
            query: tagQuery,
            variables() {
                return { 
                    tag: this.$route.params.tag,
                    start: (this.page - 1) * this.pageSize,
                    limit: this.pageSize
                };
            },
            result(result) {
                this.blogPosts = result.data.blogPosts;
                this.numPages = Math.ceil(result.data.blogPostsConnection.aggregate.count / this.pageSize);
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
        Sidebar
    }
}
</script>