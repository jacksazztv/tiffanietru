<template>
  <div class="d-flex flex-column vh-100">
    <header>
      <Navbar isFixed :showNavbar="showNavbar" />
      <SidebarNav />
    </header>
    <main role="main" class="flex-shrink-0">
      <nuxt />
    </main>
    <Footer class="mt-auto" />
  </div>
</template>

<script>
import seoQuery from '~/apollo/queries/seo/seo.gql';
import Navbar from "~/components/Navbar.vue"
import Footer from "~/components/Footer.vue"
import SidebarNav from "~/components/SidebarNav.vue"

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
      showNavbar: true,
      lastScrollPosition: 0,
      api_url: process.env.strapiBaseUri,
    }
  },
  components: {
    Navbar,
    Footer,
    SidebarNav
  },
  methods: {
    onScroll() {
      // Get the current scroll position
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition < 0) {
        return;
      }

      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }

      // Here we determine whether we need to show or hide the navbar
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      // Set the current scroll position as the last scroll position
      this.lastScrollPosition = currentScrollPosition;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  apollo: {
    seo: {
      prefetch: true,
      query: seoQuery,
    }
  }
}
</script>

<style scoped>
  main {
    padding-top: 70px !important;
  }
</style>