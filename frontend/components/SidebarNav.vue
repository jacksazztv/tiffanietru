<template>
    <b-sidebar 
      id="sidebar"
      bg-variant="white"
      text-variant="light"
      no-header
      backdrop>
      <template v-slot:default>
        <header class="px-3 pt-3">
          <b-img  height="32" src="~/assets/tifftru.png" alt="Tiffanie Tru"></b-img>
        </header>
        <hr />
        <div class="px-3">
            <nav>
                <b-nav vertical>
                    <b-nav-item to="/" exact-active-class="active">
                    Home
                    </b-nav-item>
                    <b-nav-item to="/about" active-class="active">
                    About
                    </b-nav-item>
                    <b-nav-item-dropdown
                      :toggle-class="['toggle-custom', { active: tarotMenuActive }]"
                      text="Tarot">
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
                </b-nav>
            </nav>
        </div>
        <hr />
        <div class="px-3 pb-2">
          <SearchForm></SearchForm>
        </div>
      </template>
    </b-sidebar>
</template>

<script>
import SearchForm from '~/components/SearchForm.vue';

export default {
  computed: {
    tarotMenuActive() {
      return ['/what-is-tarot', '/horoscopes', '/commissions', '/testimonials'].includes(this.$nuxt.$route.path);
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems'];
    }
  },
  components: {
    SearchForm
  }
}
</script>


<style scoped>
    a {
        color: rgba(0, 0, 0, 0.5) !important;
    }

    a.active {
        color: rgba(0, 0, 0, 0.9) !important;
    }
</style>

<style>
    .toggle-custom {
        color: rgba(0, 0, 0, 0.5) !important;
    }

    .toggle-custom.active {
        color: rgba(0, 0, 0, 0.9) !important;
    }
</style>