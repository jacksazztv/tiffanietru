<template>
    <b-container class="py-5 text-center">
        <h1 v-if="error.statusCode === 404">Page not found!</h1>
        <h1 v-else>An error occurred</h1>
        <nuxt-link to="/">Home page</nuxt-link>
    </b-container>
</template>

<script>
export default {
    head: {
        title: 'Error'
    },
    props: ['error'],
}
</script>