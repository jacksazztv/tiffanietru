<template>
  <div class="text-muted small bg-dark">
    <b-container class="py-5 bg-secondary" fluid>
      <b-container>
        <b-row>
          <b-col sm>
            <h5>Navigation</h5>
            <ul>
              <li><nuxt-link to="/">Home</nuxt-link></li>
              <li><nuxt-link to="/about">About</nuxt-link></li>
              <li><nuxt-link to="/what-is-tarot">What is tarot?</nuxt-link></li>
              <li><nuxt-link to="/horoscopes">Horoscopes</nuxt-link></li>
              <li><nuxt-link to="/commissions">Commissions</nuxt-link></li>
              <li><nuxt-link to="/testimonials">Testimonials</nuxt-link></li>
              <li><nuxt-link to="/writings">Writings</nuxt-link></li>
              <li><nuxt-link to="/links">Links</nuxt-link></li>
            </ul>
          </b-col>
          <b-col sm>
            <h5>Business Inquiries</h5>
            <ul>
              <li><a href="mailto:businessemail1@gmail.com">businessemail1@gmail.com</a></li>
              <li><a href="mailto:businessemail2@gmail.com">businessemail2@gmail.com</a></li>
            </ul>
          </b-col>
          <b-col sm>
            <h5>Latest Writings</h5>
            <ol class="blog-links">
              <li v-for="blogPost in blogPosts" :key="blogPost.id">
                <nuxt-link :to="'/writings/' + blogPost.slug">{{ blogPost.title }}</nuxt-link>
              </li>
            </ol>
          </b-col>
          <b-col sm>
            <h5>Find me</h5>
            <p>Don't forget to follow me on all my social media!</p>
            <ul class="social-links">
              <li><a href="https://twitch.tv/foxyfurytv"><font-awesome-icon :icon="['fab', 'twitch']" /></a></li>
              <li><a href="https://www.instagram.com/foxyfurytv"><font-awesome-icon :icon="['fab', 'instagram']" /></a></li>
              <li><a href="https://twitter.com/FoxyFury"><font-awesome-icon :icon="['fab', 'twitter']" /></a></li>
              <li><a href="https://www.youtube.com/channel/UCFKGBwzld3DoJEMfHt-PqlA"><font-awesome-icon :icon="['fab', 'youtube']" /></a></li>
              <li><a href="https://www.patreon.com/asmrtiff"><font-awesome-icon :icon="['fab', 'patreon']" /></a></li>
              <li><a href="https://onlyfans.com/foxyfury"><font-awesome-icon :icon="['fa', 'lock']" /></a></li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
    <b-container class="py-5">
      <span>© 2020 <a href="#">Tiffanie Tru</a> | All Rights Reserved</span>
    </b-container>
  </div>
</template>

<script>
import blogPostQuery from "~/apollo/queries/blog-post/blog-posts.gql";

export default {
  data() {
    return {
      blogPosts: []
    };
  },
  apollo: {
    blogPosts: {
      prefetch: true,
      query: blogPostQuery,
      variables() {
        return { limit: 3 }
      }
    }
  }
}
</script>

<style scoped>
  h5 {
    color: #fff !important;
    font-weight: 300 !important;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .social-links a {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.2rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    transition: color 0.2s ease-in-out;
  }

  .social-links a:hover {
    color: #fff;
  }

  ul, ol {
    padding-left: 1rem;
  }

  .social-links {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    list-style-type: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .blog-links {
    list-style-type: none;
    padding: 0;
    margin: 0;
    counter-reset: my-counter;
  }

  .blog-links li {
    display: flex;
    align-items: center;
    counter-increment: my-counter;
    padding:0.3rem 0;
  }

  .blog-links li:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .blog-links li:before {
    content: counter(my-counter);
    font-size: 2rem;
    font-style: italic;
    margin-right: 0.5rem;
  }

  .blog-links a {
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    transition: color 0.2s ease-in-out;
  }

  .blog-links a:hover {
    color: #fff;
  }
 
  a {
    text-decoration: none !important;
  }
</style>
