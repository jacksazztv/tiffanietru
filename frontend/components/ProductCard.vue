<template>
    <nuxt-link class="card-link" :to="`/products/${product.slug}`">
        <b-card
            tag="article"
            class="shadow"
            :img-src="apiUrl + product.image.url"
            :img-width="product.image.width"
            :img-height="product.image.height"
            :img-alt="product.name"
            :title="product.name"
            :sub-title="'$' + product.price / 100"
            img-top>

            <b-card-text>
                {{ product.excerpt }}
            </b-card-text>

        </b-card>
    </nuxt-link>
</template>

<script>
export default {
    data() {
        return {
            apiUrl: process.env.strapiBaseUri
        };
    },
    props: {
        product: Object
    }
}
</script>

<style scoped>
.card-link {
    text-decoration: none !important;
    color: inherit;
}

.card {
    transition: box-shadow 0.5s ease-in-out;
    box-shadow: none !important;
}

.card-link:hover .card {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>