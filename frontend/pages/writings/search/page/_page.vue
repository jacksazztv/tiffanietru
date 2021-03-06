<template>
    <b-container class="py-4">
        <header class="text-center mb-4">
            <h1 class="display-3 sub-heading">{{ searchQuery }}</h1>
        </header>
        <b-row>
            <b-col sm="8">
                <div v-if="$apollo.loading">
                    <PostCardSkeleton v-for="i in 3" :key="i" responsive></PostCardSkeleton>
                </div>
                <div v-else>
                    <div v-if="!blogSearch.length">
                        <h2>No results found</h2>
                        <p>Please try again with different search terms.</p>
                    </div>
                    <PostCard v-for="blogPost in blogSearch" :key="blogPost.id"
                        v-scrollanimation
                        class="animated"
                        :post="blogPost"
                        :highlight-text="searchQuery"
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
import blogSearchQuery from '~/apollo/queries/blog-post/blog-search.gql';
import seoQuery from '~/apollo/queries/seo/seo.gql';

export default {
    head() {
        return {
            title: `${this.searchQuery} - ${this.seo.siteName}`,
            meta: [
                {
                    hid: 'og-title',
                    property: 'og:title',
                    content: `${this.searchQuery} - ${this.seo.siteName}`
                }
            ],
        };
    },
    computed: {
        searchQuery() {
            return this.$route.query.q || '';
        }
    },
    methods: {
        linkGen(page) {
            return page === 1 ? `/writings/search?q=${encodeURIComponent(this.searchQuery)}` : `/writings/search/page/${page}?q=${encodeURIComponent(this.searchQuery)}`;   
        }
    },
    data() {
        return { 
            blogSearch: [],
            page: +this.$route.query.q || 1,
            numPages: 1,
            pageSize: 10,
            api_url: process.env.strapiBaseUri,
            seo: {},
        }
    },
    apollo: {
        blogSearch: {
            prefetch: true,
            query: blogSearchQuery,
            variables() {
                return { 
                    query: this.searchQuery,
                    sort: 'published_at:desc',
                    start: (this.page - 1) * this.pageSize,
                    limit: this.pageSize
                };
            },
            result(result) {
                if (result.data.blogSearch && result.data.blogSearchCount) {
                    this.blogSearch = result.data.blogSearch;
                    this.numPages = Math.ceil(result.data.blogSearchCount / this.pageSize);
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
        Sidebar
    }
}
</script>