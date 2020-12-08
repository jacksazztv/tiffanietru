<template>
  <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
  <b-container v-else class="py-4">
    <section>
      <header class="text-center mb-4">
        <h1 :class="['display-3', { 'sub-heading': !subTitle }]">
          {{ title }}
          <small v-if="subTitle" class="text-muted sub-heading">{{ subTitle }}</small>
        </h1>
      </header>

      <b-row>
        <b-col sm="8" order="12" order-sm="1">
          <div v-html="$md.render(content)"></div>
        </b-col>
        <b-col class="mb-4" sm="4" order="1" order-sm="12">
          <b-img-lazy v-scrollanimation :src="apiUrl + photo.url" :width="photo.width" :height="photo.height" alt="Pfp" class="d-block animated w-100 rounded-circle" fluid></b-img-lazy>
        </b-col>
      </b-row>
    </section>
  </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import aboutQuery from '~/apollo/queries/pages/about.gql';
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
  data() {
    return { 
      apiUrl: process.env.strapiBaseUri,
      title: '',
      subTitle: '',
      content: '',
      photo: {},
      seo: {},
    };
  },
  apollo: {
    about: {
      prefetch: true,
      query: aboutQuery,
      result(result) {
        if (result.data.about) {
          this.title = result.data.about.title;
          this.subTitle = result.data.about.subtitle;
          this.content = result.data.about.content;
          this.photo = result.data.about.photo;
        }
      }
    },
    seo: {
      prefetch: true,
      query: seoQuery
    }
  },
  components: {
    LoadingComponent
  }
}
</script>