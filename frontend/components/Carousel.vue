<template>
  <b-carousel
    id="carouselSlider"
    controls
    v-model="slide"
    img-width="1500"
    img-height="500"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
    indicators
    fade>
    <b-carousel-slide v-for="(slide, i) in slides" :key="slide.id" :class="['h-100', {active: i === 0}]">
      <template v-slot:img>
        <b-img-lazy
          class="d-block w-100 h-100 slide-img"
          width="1500"
          height="500"
          :src="apiUrl + slide.image.url"
          :alt="slide.title">
        </b-img-lazy>
        <div class="black-overlay"></div>
      </template>
      <div>
        <transition name="fadeUp1">
          <h3 v-show="slideVisible" class="text-white">{{ slide.title }}</h3>
        </transition>
        <transition name="fadeUp2">
          <p v-show="slideVisible">{{ slide.text }}</p>
        </transition>
        <transition-group name="fadeUp3"
          tag="ul"
          class="list-unstyled mb-0 d-flex align-items-center justify-content-center">
          <li v-show="slideVisible" v-for="button in slide.buttons" :key="button.id">
            <b-button
              target="_blank"
              rel="noopener noreferrer"
              :href="button.link"
              :style="{ backgroundColor: button.color, borderColor: button.color }">
              <font-awesome-icon :icon="['fab', button.icon]" />
              {{ button.text }}
            </b-button>
          </li>
        </transition-group>
      </div>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
import slideQuery from '~/apollo/queries/slide/slides.gql';

export default {
  data() {
    return {
      apiUrl: process.env.strapiBaseUri,
      slide: 0,
      slideVisible: false
    }
  },
  mounted() {
    this.slideVisible = true;
  },
  methods: {
    onSlideStart() {
      this.slideVisible = false;
    },
    onSlideEnd() {
      this.slideVisible = true;
    },
  },
  apollo: {
    slides: {
      prefetch: true,
      query: slideQuery
    }
  }
}
</script>

<style>
.carousel {
  padding-top: 33.33%;
}

@media (max-width: 767.98px) {
  .carousel {
    padding-top: 50vh;
  }
}

.carousel-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
  .btn {
    transition: opacity 0.2s ease-in-out;
    margin: 0 5px;
  }

  .btn:hover {
    opacity: 0.9;
  }

  .black-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .slide-img {
    object-fit: cover;
  }

  .fadeUp1-enter-active, .fadeUp2-enter-active, .fadeUp3-enter-active {
    transition: all 0.5s ease-out;
  }

  .fadeUp1-enter {
    opacity: 0;
    transform: translateY(-25px);
  }

  .fadeUp2-enter, .fadeUp3-enter {
    opacity: 0;
    transform: translateY(25px);
  }

  .fadeUp2-enter-active {
    transition-delay: 0.1s;
  }

  .fadeUp3-enter-active {
    transition-delay: 0.2s;
  }
</style>
