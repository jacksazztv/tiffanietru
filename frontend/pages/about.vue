<template>
  <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
  <b-container v-else class="py-5">
    <section>
      <header class="text-center mb-5">
        <h1 class="display-3">{{ title }}</h1>
        <h2 v-if="subTitle" class="h5 sub-heading text-muted">{{ subTitle }}</h2>
      </header>

      <b-row>
        <b-col sm="8" order="12" order-sm="1">
          <div v-html="$md.render(content)"></div>
        </b-col>
        <b-col class="mb-4" sm="4" order="1" order-sm="12">
          <b-img src="~/assets/pfp.jpg" alt="Pfp" class="d-block w-100 rounded-circle" fluid></b-img>
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
      title: '',
      subTitle: '',
      content: '',
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