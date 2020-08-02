<template>
  <b-carousel
    id="carouselSlider"
    controls
    v-model="slide"
    indicators
    fade>
    <b-carousel-slide class="active">
      <template v-slot:img>
        <img 
          class="d-block img-fluid w-100 slide-img" 
          width="1500" 
          height="500" 
          src="~/assets/youtube_banner.jpg"
          alt="Banner" >
        <div class="black-overlay" />
      </template>
      <div>
        <h3>Subscribe to my ASMR YouTube channel</h3>
        <p>New videos every week!</p>
        <a class="btn btn-danger"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/channel/UCFKGBwzld3DoJEMfHt-PqlA">
        <font-awesome-icon :icon="['fab', 'youtube']" /> YouTube</a>
      </div>
    </b-carousel-slide>
    <b-carousel-slide>
      <template v-slot:img>
        <img
          class="d-block img-fluid w-100 slide-img"
          width="1500"
          height="500"
          src="~/assets/twitter_banner.jpg"
          alt="Banner" >
        <div class="black-overlay" />
      </template>
      <div>
        <h3>Follow me on Twitch</h3>
        <p>I stream a variety of content including ASMR, Just Chatting, Tarot, and Games!</p>
      </div>
      <a
        class="btn btn-dark"
        style="background-color: var(--purple);"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.twitch.tv/foxyfurytv"
      ><font-awesome-icon :icon="['fab', 'twitch']" /> Twitch</a>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
    }
  }
}
</script>

<style scoped>
  h3 {
    color: #fff;
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
