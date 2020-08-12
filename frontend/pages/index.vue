<template>
  <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
  <div v-else>
    <Carousel ref="slider" />
    <b-container class="py-5">
      <section>
        <header class="text-center mb-5">
          <h1 :class="['display-3', { 'sub-heading': !subTitle }]">
            {{ title }}
            <small v-if="subTitle" class="sub-heading text-muted">{{ subTitle }}</small>
          </h1>
        </header>
        <b-row>
          <b-col sm="8" order="12" order-sm="1" v-html="$md.render(content)">
          </b-col>
          <b-col sm="4" order="1" order-sm="12" class="mb-4">
            <b-img src="~/assets/foxyfuryasmrlogoblack.png" alt="Image" fluid></b-img>
          </b-col>
        </b-row>        
      </section>
    </b-container>

    <div class="bg-light py-5">
      <b-container>
        <section>
          <h2 class="sub-heading mb-4">Latest Writings</h2>
          <b-row>
            <b-col class="d-flex align-items-stretch" v-for="blogPost in blogPosts" :key="blogPost.id" lg>
              <PostCard
                :img-src="api_url + blogPost.image.url"
                :title="blogPost.title"
                :sub-title="blogPost.created_at"
                :text="blogPost.excerpt"
                :tags="blogPost.tags"
                :slug="blogPost.slug">
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
    }
  },
  components: {
    Carousel,
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
