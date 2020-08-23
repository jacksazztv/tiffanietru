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
                </b-nav>
            </nav>
        </div>
        <hr />
        <div class="px-3 pb-2">
          <nav>
            <b-nav vertical>
              <b-nav-item
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.twitch.tv/foxyfurytv">
                <font-awesome-icon :icon="['fab', 'twitch']" />
                <span>Twitch</span>
              </b-nav-item>
              <b-nav-item-dropdown toggle-class="toggle-custom">
                <template slot="button-content">
                  <font-awesome-icon :icon="['fab', 'instagram']" />
                  <span>Instagram</span>
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
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/FoxyFury"
              >
                <font-awesome-icon :icon="['fab', 'twitter']" />
                <span>Twitter</span>
              </b-nav-item>
              <b-nav-item
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/channel/UCFKGBwzld3DoJEMfHt-PqlA"
              >
                <font-awesome-icon :icon="['fab', 'youtube']" />
                <span>YouTube</span>
              </b-nav-item>
              <b-nav-item
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.patreon.com/asmrtiff">
                <font-awesome-icon :icon="['fab', 'patreon']" />
                <span>Patreon</span>
              </b-nav-item>
              <b-nav-item
                target="_blank"
                rel="noopener noreferrer"
                href="https://onlyfans.com/foxyfury">
                <font-awesome-icon :icon="['fa', 'lock']" />
                <span>OnlyFans</span>
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
      return this.$nuxt.$route.path.startsWith('/tarot');
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