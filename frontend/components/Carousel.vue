<template>
  <b-carousel
    id="carouselSlider"
    controls
    v-model="slide"
    img-width="1500"
    img-height="500"
    indicators
    fade>
    <b-carousel-slide v-if="$apollo.loading" class="active" img-blank img-alt="Loading"></b-carousel-slide>
    <b-carousel-slide v-else v-for="(slide, i) in slides" :key="slide.id" :class="{ active: i === 0 }">
      <template v-slot:img>
        <b-img
          class="d-block w-100 slide-img"
          width="1500"
          height="500"
          :src="api_url + slide.image.url"
          alt="Banner"
          fluid>
        </b-img>
        <div class="black-overlay"></div>
      </template>
      <div>
        <h3 class="text-white">{{ slide.title }}</h3>
        <p>{{ slide.text }}</p>
        <b-button v-for="button in slide.buttons" :key="button.id"
          target="_blank"
          rel="noopener noreferrer"
          :href="button.link"
          :style="{ backgroundColor: button.color, borderColor: button.color }">
          <font-awesome-icon :icon="['fab', button.icon]" />
          {{ button.text }}
        </b-button>
      </div>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
import slideQuery from '~/apollo/queries/slide/slides.gql';

export default {
  data() {
    return {
      api_url: process.env.strapiBaseUri,
      slide: 0,
    }
  },
  apollo: {
    slides: {
      prefetch: true,
      query: slideQuery
    }
  }
}
</script>

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
    min-width: 100%;
  }

  @media (max-width: 767.98px) {
    .slide-img {
      height: 50vh !important;
      object-fit: cover !important;
    }
  }
</style>
