<template>
    <b-card v-if="responsive"
        no-body
        tag="article"
        class="overflow-hidden shadow-sm mb-4">
        <b-row no-gutters>
            <b-col lg="5">
                <div class="skeleton skeleton-image h-100"></div>
            </b-col>
            <b-col lg="7" class="d-flex flex-column">
                <b-card-body class="flex-shrink-0">
                    <b-card-title class="skeleton skeleton-title"></b-card-title>
                    <b-card-sub-title class="skeleton skeleton-subtitle"></b-card-sub-title>
                    <b-card-text class="skeleton skeleton-text">
                    </b-card-text>
                </b-card-body>
                <b-card-footer class="mt-auto">
                    <div class="skeleton skeleton-text"></div>
                </b-card-footer>
            </b-col>
        </b-row>
    </b-card>
    <b-card v-else
        no-body
        tag="article"
        class="overflow-hidden shadow-sm mb-4">

        <div class="skeleton skeleton-image"></div>

        <b-card-body>
            <b-card-title class="skeleton skeleton-title"></b-card-title>
            <b-card-sub-title class="skeleton skeleton-subtitle"></b-card-sub-title>
            <b-card-text class="skeleton skeleton-text"></b-card-text>
        </b-card-body>

        <b-card-footer class="mt-auto">
            <div class="skeleton skeleton-text"></div>
        </b-card-footer>
    </b-card>
</template>

<script>
export default {
    props: {
        responsive: Boolean
    }
}
</script>

<style scoped>
    .skeleton {
        background-color: #ddd;
        animation: pulse-bg 1s infinite;
    }

    .skeleton-image {
        height: 196px;
    }

    .skeleton-title {
        height: 1.5rem;
        margin-bottom: 0.8rem;
    }

    .skeleton-subtitle {
        height: 1rem;
        margin-bottom: 0.5rem;
    }

    .skeleton-text {
        height: 1rem;
        margin-bottom: 0.5rem;
    }

    @keyframes pulse-bg {
        0% { background-color: #ddd; }
        50% { background-color: #d0d0d0; }
        100% { background-color: #ddd; }
    }
</style>
