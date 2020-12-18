<template>
    <div v-if="$apollo.loading">
        <b-jumbotron class="py-4" fluid>
            <b-row>
                <b-col class="d-flex align-items-stretch" v-for="i in 3" :key="i" sm>
                    <PostCardSkeleton class="flex-grow-1"></PostCardSkeleton>
                </b-col>
            </b-row>
        </b-jumbotron>
        <b-container class="py-4">
            <b-row>
                <b-col sm="8">
                    <PostCardSkeleton v-for="i in 3" :key="i" responsive></PostCardSkeleton>
                </b-col>
                <b-col sm="4">
                    <Sidebar></Sidebar>
                </b-col>
            </b-row>
        </b-container>
    </div>
    <div v-else>
        <b-jumbotron v-if="featuredPosts.length" class="d-none d-md-block pt-4 pb-0 mb-0" fluid>
            <b-row no-gutters>
                <b-col v-for="(featuredPost, i) in featuredPosts" 
                    :key="featuredPost.id"
                    class="d-flex align-items-stretch mb-4"
                    :md="i === 0 ? 6 : 3">
                    <FeaturedTile :primary="i === 0" class="animated" v-scrollanimation="'fadeIn'" :post="featuredPost"></FeaturedTile>
                </b-col>
            </b-row>
        </b-jumbotron>
        <b-container class="py-4">
            <b-row>
                <b-col sm="8">
                    <div class="d-md-none">
                        <PostCard v-for="blogPost in featuredPosts" :key="blogPost.id"
                            v-scrollanimation="'fadeIn'"
                            class="animated"
                            :post="blogPost"
                            responsive>
                        </PostCard>
                    </div>
                    <PostCard v-for="blogPost in otherPosts" :key="blogPost.id"
                        v-scrollanimation="'fadeIn'"
                        class="animated"
                        :post="blogPost"
                        responsive>
                    </PostCard>
                    <b-pagination-nav
                        v-if="numPages > 1"
                        align="center"
                        :link-gen="linkGen"
                        :number-of-pages="numPages"
                        use-router>
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
import FeaturedTile from '~/components/FeaturedTile.vue';
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
            return this.blogPosts.length > 3 ? this.blogPosts.slice(0, 3) : [];
        },
        otherPosts() {
            return this.blogPosts.length > 3 ? this.blogPosts.slice(3) : this.blogPosts;
        },
    },
    methods: {
        linkGen(page) {
            return page === 1 ? '/writings' : `/writings/page/${page}`;
        }
    },
    data() {
        return {
            title: '',
            subTitle: '',
            blogPosts: [],
            numPages: 1,
            api_url: process.env.strapiBaseUri,
            page: 1,
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
        FeaturedTile,
        PostCard,
        PostCardSkeleton,
        Sidebar
    },
}
</script>