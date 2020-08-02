<template>
  <b-navbar toggleable="sm" type="dark" variant="dark" class="shadow" :class="{ 'navbar-hidden': !showNavbar }" :fixed="isFixed ? 'top' : ''">
    <b-navbar-brand href="#">
      <img height="45" src="~/assets/foxyfurylogo.svg" alt="FoxyFury" />
    </b-navbar-brand>

    <b-navbar-toggle target="sidebar"></b-navbar-toggle>

    <b-collapse id="navbarSupportedContent" is-nav>
      <b-navbar-nav class="mr-auto">
        <b-nav-item to="/" exact-active-class="active">
          Home
        </b-nav-item>
        <b-nav-item to="/about" active-class="active">
          About
        </b-nav-item>
        <b-nav-item-dropdown text="Tarot" :class="{ active: tarotMenuActive }">
          <b-dropdown-item to="/tarot/what-is-tarot">
            What is Tarot?
          </b-dropdown-item>
          <b-dropdown-item to="/tarot/horoscopes">
            Horoscopes
          </b-dropdown-item>
          <b-dropdown-item to="/tarot/commissions">
            Commissions
          </b-dropdown-item>
          <b-dropdown-item to="/tarot/testimonials">
            Testimonials
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/writings" active-class="active">
          Writings
        </b-nav-item>
        <b-nav-item to="/links" active-class="active">
          Links
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="mr-1">
        <b-nav-item
          v-b-popover.hover.bottom="'Twitch'"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.twitch.tv/foxyfurytv">
          <font-awesome-icon :icon="['fab', 'twitch']" />
          <span class="d-inline d-sm-none">Twitch</span>
        </b-nav-item>
        <b-nav-item-dropdown v-b-popover.hover.bottom="'Instagram'">
          <template slot="button-content">
            <font-awesome-icon :icon="['fab', 'instagram']" />
            <span class="d-inline d-sm-none">Instagram</span>
          </template>
          <b-dropdown-item
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/foxyfurytv">
            Instagram
          </b-dropdown-item>
          <b-dropdown-item
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/tiffsasmr">
            ASMR Insta
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item
          v-b-popover.hover.bottom="'Twitter'"
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/FoxyFury">
          <font-awesome-icon :icon="['fab', 'twitter']" />
          <span class="d-inline d-sm-none">Twitter</span>
        </b-nav-item>
        <b-nav-item
          v-b-popover.hover.bottom="'YouTube'"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/channel/UCFKGBwzld3DoJEMfHt-PqlA">
          <font-awesome-icon :icon="['fab', 'youtube']" />
          <span class="d-inline d-sm-none">YouTube</span>
        </b-nav-item>
        <b-nav-item
          v-b-popover.hover.bottom="'Patreon'"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.patreon.com/asmrtiff">
          <font-awesome-icon :icon="['fab', 'patreon']" />
          <span class="d-inline d-sm-none">Patreon</span>
        </b-nav-item>
        <b-nav-item
          v-b-popover.hover.bottom="'OnlyFans'"
          target="_blank"
          rel="noopener noreferrer"
          href="https://onlyfans.com/foxyfury">
          <font-awesome-icon :icon="['fa', 'lock']" />
          <span class="d-inline d-sm-none">OnlyFans</span>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-if="username">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <font-awesome-icon :icon="['fa', 'user']" />
            {{ username }}
          </template>
          <b-dropdown-item @click="onLogout">
            Logout
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav v-else>
        <b-nav-item to="/login" active>
          Sign in
        </b-nav-item>
        <b-nav-item  class="border border-primary rounded" to="/register" active>
          Sign up
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  computed: {
    username() {
      return this.$store.getters['auth/username'];
    },
    tarotMenuActive() {
      return this.$nuxt.$route.path.startsWith('/tarot');
    }
  },
  methods: {
    onLogout() {
      this.$apolloHelpers.onLogout();
      this.logout();
    },
    ...mapMutations({
      logout: 'auth/logout'
    })
  },
  props: {
    isFixed: Boolean,
    showNavbar: Boolean
  }
}
</script>

<style scoped>
  .navbar {
    transition: all 0.1s ease-in-out;
  }

  .navbar-hidden {
    box-shadow: none !important;
    transform: translate3d(0, -100%, 0);
  }

  a {
    color: rgba(255, 255, 255, 0.5) !important;
  }

  a.active {
    color: #fff !important;
  }

  hr {
    border-color: rgba(255, 255, 255, 0.1) !important;
  }

  .toggle-custom {
    color: #fff !important;
  }
</style>