<template>
    <div class="mb-4">
        <b-media>
            <template v-slot:aside>
                <b-img src="~/assets/foxyfuryasmrlogoblack.png" class="rounded-circle" width="40" alt="Avatar"></b-img>
            </template>
            <div class="d-flex flex-row">
                <b>{{ comment.author.username }}</b>
                <time class="text-muted ml-auto">{{  $dayjs(comment.date).format('MMM D, YYYY') }}</time>
            </div>
            <div class="comment-content">
                {{ comment.content }}
            </div>
            <div v-if="username">
                <b-link @click="$emit('show-reply-box', comment)" class="comment-btn text-muted">Reply</b-link>
            </div>
            <slot></slot>
        </b-media>
    </div>
</template>

<script>
export default {
    computed: {
        username() {
            return this.$store.getters['auth/username'];
        }
    },
    props: {
        comment: Object
    }
}
</script>

<style scoped>
    .comment-content {
        -ms-word-break: break-all;
        word-break: break-all;

        /* Non standard for webkit */
            word-break: break-word;

        -webkit-hyphens: auto;
        -moz-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
    }

    .comment-btn {
        text-decoration: none !important;
    }
</style>