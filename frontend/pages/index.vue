<template>
  <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
  <div v-else>
    <Carousel />
    <b-container class="py-4">
      <section>
        <header class="text-center mb-4">
          <h1 :class="['display-3', { 'sub-heading': !subTitle }]">
            {{ title }}
            <small v-if="subTitle" class="sub-heading text-muted">{{ subTitle }}</small>
          </h1>
        </header>
        <div class="text-center lead" v-html="$md.render(content)"></div>     
      </section>
    </b-container>

    <div class="bg-light py-4 overflow-hidden">
      <b-container>
        <section>
          <h2 v-scrollanimation class="sub-heading mb-4 animated">Latest Writings</h2>
          <b-row class="justify-content-center">
            <b-col class="d-flex align-items-stretch" v-for="blogPost in blogPosts" :key="blogPost.id" md="3">
              <PostCard
                v-scrollanimation="'fadeInUp'"
                class="animated"
                :post="blogPost">
              </PostCard>
            </b-col>
          </b-row>
        </section>
      </b-container>
    </div>
  </div>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import Carousel from "~/components/Carousel.vue";
import FeaturedTile from '~/components/FeaturedTile.vue';
import PostCard from "~/components/PostCard.vue";
import blogPostsQuery from "~/apollo/queries/blog-post/blog-posts.gql";
import homeQuery from "~/apollo/queries/pages/home.gql";
import seoQuery from '~/apollo/queries/seo/seo.gql';

export default {
  head() {
    return {
      title: `Home - ${this.seo.siteName}`,
      meta: [
        {
          hid: 'og-title',
          property: 'og:title',
          content: `Home - ${this.seo.siteName}`
        }
      ],
    }
  },
  data() {
    return {
      api_url: process.env.strapiBaseUri,
      title: '',
      subTitle: '',
      content: '',
      blogPosts: [],
      seo: {},
    }
  },
  components: {
    Carousel,
    FeaturedTile,
    PostCard,
    LoadingComponent
  },
  apollo: {
    blogPosts: {
      prefetch: true,
      query: blogPostsQuery,
      variables() {
        return { limit: 4 };
      }
    },
    home: {
      prefetch: true,
      query: homeQuery,
      result(result) {
        if (result.data.home) {
          this.title = result.data.home.title;
          this.subTitle = result.data.home.subtitle;
          this.content = result.data.home.content;
        }
      }
    },
    seo: {
      prefetch: true,
      query: seoQuery
    }
  }
}
</script>
