<template>
<div>
  <b-navbar toggleable="lg" type="light" variant="white">
    <b-navbar-brand href="#">
      <b-img height="32" src="~/assets/tifftru.png" alt="Tiffanie Tru"></b-img>
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
          <b-dropdown-item to="/what-is-tarot">
            What is Tarot?
          </b-dropdown-item>
          <b-dropdown-item to="/horoscopes">
            Horoscopes
          </b-dropdown-item>
          <b-dropdown-item to="/commissions">
            Commissions
          </b-dropdown-item>
          <b-dropdown-item to="/testimonials">
            Testimonials
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/writings" active-class="active">
          Writings
        </b-nav-item>
        <b-nav-item to="/links" active-class="active">
          Links
        </b-nav-item>
        <b-nav-item to="/cart" active-class="active">
          Cart <span v-if="numberOfItems">({{ numberOfItems }})</span>
        </b-nav-item>
      </b-navbar-nav>

      <ul class="d-flex list-unstyled m-0 p-0" v-if="username">
        <b-dropdown variant="transparent" right>
          <template slot="button-content">
            <font-awesome-icon :icon="['fa', 'user']" />
            {{ username }}
          </template>
          <b-dropdown-item @click="onLogout">
            Logout
          </b-dropdown-item>
        </b-dropdown>
      </ul>
      <ul class="d-flex list-unstyled m-0 p-0" v-else>
        <li>
          <b-button variant="transparent" to="/login">Sign in</b-button>
        </li>
        <li>
          <b-button variant="primary" to="/register">Sign up</b-button>
        </li>
      </ul>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  computed: {
    username() {
      return this.$store.getters['auth/username'];
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems'];
    },
    tarotMenuActive() {
      return ['/what-is-tarot', '/horoscopes', '/commissions', '/testimonials'].includes(this.$nuxt.$route.path);
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
}
</script>

<style lang="scss">
  @import '~/assets/scss/custom-vars.scss';

  .navbar {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .nav-link {
    position: relative;
    font-family: $headings-font-family;
    font-weight: 400;
    text-transform: uppercase;
  }

  .navbar-nav .nav-link::before {
    content: '';
    background-color: rgba(0, 0, 0, 0.7);
    width: calc(100% - 1rem);
    height: 1px;
    position: absolute;
    left: 0.5rem;
    bottom: 0.5rem;
    visibility: hidden;
    transform: scaleX(0);
    transform-origin: top left;
    transition: all 0.3s ease-in-out;
  }

  .navbar-nav .nav-link:hover::before {
    visibility: visible;
    transform: scaleX(1);
  }
</style>