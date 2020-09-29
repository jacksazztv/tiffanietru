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
        <b-nav-item to="/cart">
          <font-awesome-icon :icon="['fa', 'shopping-cart']" /> <span class="sr-only">Cart</span> {{ numberOfItems }}
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else>
        <b-nav-item to="/login" active>
          Sign in
        </b-nav-item>
        <b-nav-item  class="bg-primary rounded" link-classes="text-white" to="/register" active>
          Sign up
        </b-nav-item>
        <b-nav-item to="/cart">
          <font-awesome-icon :icon="['fa', 'shopping-cart']" /> <span class="sr-only">Cart</span> {{ numberOfItems }}
        </b-nav-item>
      </b-navbar-nav>
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

<style>
  .navbar {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .nav-link, .nav-link-dropdown-toggle {
    font-weight: 500;
  }
</style>