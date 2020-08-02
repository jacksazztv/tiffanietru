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
import Navbar from "~/components/Navbar.vue"
import Footer from "~/components/Footer.vue"
import SidebarNav from "~/components/SidebarNav.vue"

export default {
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0
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
  }
}
</script>

<style scoped>
  main {
    padding-top: 70px !important;
  }
</style>