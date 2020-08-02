<template>
  <LoadingComponent v-if="$apollo.loading"></LoadingComponent>
  <b-container v-else class="py-5">
    <header class="text-center mb-5">
      <h1 class="display-3">{{ title }}</h1>
      <h5 v-if="subTitle" class="sub-heading text-muted">{{ subTitle }}</h5>
    </header>

    <b-row>
      <b-col sm="8" order="12" order-sm="1">
        <div v-html="$md.render(content)"></div>
      </b-col>
      <b-col class="mb-4" sm="4" order="1" order-sm="12">
        <b-img src="~/assets/pfp.jpg" alt="Pfp" class="d-block w-100 rounded-circle" fluid></b-img>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LoadingComponent from '~/components/LoadingComponent.vue';
import aboutQuery from '~/apollo/queries/pages/about.gql';

export default {
  head() {
    return { title: this.title };
  },
  data() {
    return { 
      title: '',
      subTitle: '',
      content: ''
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
    }
  },
  components: {
    LoadingComponent
  }
}
</script>