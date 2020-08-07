<template>
    <div>
        <h2 class="sub-heading">Comments</h2>
        <Comment v-for="comment in comments" :key="comment.id"
            @show-reply-box="showReplyBox"
            :comment="comment">

            <div v-if="replyingTo && replyingTo.id === comment.id">
                <b-form-input  ref="replyInput" class="my-1" v-model="replyText"></b-form-input>
                <div class="d-flex flex-row">
                    <b-button variant="primary" @click="dismissReplyBox" class="text-white ml-auto" size="sm">Cancel</b-button>
                    <b-button variant="primary" @click="sendReply" class="text-white ml-1" size="sm">Reply</b-button>
                </div>
            </div>

            <Comment class="mt-2" v-for="reply in comment.replies" :key="reply.id"
                @show-reply-box="showReplyBox"
                :comment="reply">

                <div v-if="replyingTo && replyingTo.id === reply.id">
                    <b-form-input ref="replyInput" class="my-1" v-model="replyText"></b-form-input>
                    <div class="d-flex flex-row">
                        <b-button variant="primary" @click="dismissReplyBox" class="text-white ml-auto" size="sm">Cancel</b-button>
                        <b-button variant="primary" @click="sendReply" class="text-white ml-1" size="sm">Reply</b-button>
                    </div>
                </div>
            </Comment>
        </Comment>

        <div v-if="username">
            <h3>Leave a comment</h3>
            <b-form-textarea
                class="mb-2"
                v-model="commentText"
                placeholder="Write your comment"
                no-resize>
            </b-form-textarea>
            <b-button @click="createComment" variant="primary" class="text-white mb-4">Post comment</b-button>
        </div>
    </div>
</template>

<script>
import Comment from '~/components/Comment.vue';

export default {
    computed: {
        username() {
            return this.$store.getters['auth/username'];
        }
    },
    data() {
        return {
            replyingTo: null,
            replyText: '',
            commentText: ''
        };
    },
    methods: {
        showReplyBox(comment) {
            this.replyingTo = comment;
            this.replyText = `@${comment.author.username} `;
            this.$nextTick(() => {
                this.$refs.replyInput[0].focus();
            });
        },
        dismissReplyBox() {
            this.replyingTo = null;
            this.replyText = '';
        },
        sendReply() {
            if (!this.replyingTo || !this.replyText || !this.replyText.trim()) {
                return;
            }

            let reply = this.replyText.trim();

            let parentComment = null;
            if (this.replyingTo.in_reply_to) {
                parentComment = this.replyingTo.in_reply_to.id;
            } else {
                parentComment = this.replyingTo.id;
            }

            this.$emit('send-reply', parentComment, reply);
            this.dismissReplyBox();
        }
    },
    components: {
        Comment
    },
    props: {
        comments: Array,
    }
}
</script>