<template>
  <div class="d-flex flex-column justify-content-between vh-100">
    <header>
      <SocialBar />
      <Navbar />
    </header>
    <main>
      <SidebarNav />
      <nuxt />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import seoQuery from '~/apollo/queries/seo/seo.gql';
import Navbar from "~/components/Navbar.vue"
import Footer from "~/components/Footer.vue"
import SidebarNav from "~/components/SidebarNav.vue"
import SocialBar from '~/components/SocialBar.vue';

export default {
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seo.description,
        },
        {
          hid: 'author',
          name: 'author',
          content: this.seo.author
        },
        {
          hid: 'og-locale',
          property: 'og:locale',
          content: 'en_US'
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: this.seo.description
        },
        {
          hid: 'og-type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og-site_name',
          property: 'og:site_name',
          content: this.seo.siteName
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: this.api_url + this.seo.image.url
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: this.seo.siteUrl + this.$nuxt.$route.path
        },
        {
          hid: 'twitter-creator',
          name: 'twitter:creator',
          content: this.seo.twitterUsername,
        },
        {
          hid: 'twitter-site',
          name: 'twitter:site',
          content: this.seo.twitterUsername,
        },
        {
          hid: 'twitter-card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter-image-alt',
          name: 'twitter:image:alt',
          content: this.seo.siteName,
        },
      ],
    };
  },
  data() {
    return {
      seo: {},
      api_url: process.env.strapiBaseUri,
    }
  },
  components: {
    Navbar,
    Footer,
    SidebarNav,
    SocialBar
  },
  apollo: {
    seo: {
      prefetch: true,
      query: seoQuery,
    }
  }
}
</script>