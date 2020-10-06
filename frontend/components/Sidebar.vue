<template>
    <div>
        <SearchForm class="mb-4"></SearchForm>
        <div class="p-4" style="background-color: rgba(0, 0, 0, 0.03)">
            <h4>About</h4>
            <div class="text-muted mb-2" v-html="$md.render(bio)"></div>
            <b-button class="text-white" variant="primary" to="/about" size="sm">Read more</b-button>
        </div>

        <div class="twitter-container">
            <a class="twitter-timeline" data-chrome="nofooter" data-tweet-limit="3" href="https://twitter.com/FoxyFury?ref_src=twsrc%5Etfw">Tweets by FoxyFury</a>
        </div>

        <div class="px-4">
            <h4><small><font-awesome-icon :icon="['fa', 'tag']" /></small> Tags</h4>
            <ul class="list-unstyled mb-0 d-flex flex-row flex-wrap" style="text-transform: lowercase">
                <li v-for="tag in tags" :key="tag.id">
                    <b-button :to="`/writings/tag/${tag.name}`" class="text-white mr-1 mb-1" variant="primary" size="sm">{{ tag.name }}</b-button>
                </li>
            </ul>
        </div>
    </div>
 
</template>

<script>
import SearchForm from '~/components/SearchForm.vue';
import tagsQuery from '~/apollo/queries/tag/tags.gql';
import writingsQuery from '~/apollo/queries/pages/writings.gql';

export default {
    data() {
        return {
            bio: '',
            tags: [],
        }
    },
    components: {
        SearchForm
    },
    apollo: {
        tags: {
            prefetch: true,
            query: tagsQuery,
            result(result) {
                if (result.data.tags) {
                    this.tags = result.data.tags;
                }
            }
        },
        writing: {
            prefetch: true,
            query: writingsQuery,
            result(result) {
                if (result.data.writing) {
                    this.bio = result.data.writing.bio;
                }
            }
        }
    },
    head() {
        return {
            script: [
                {
                    hid: 'twitter',
                    src: 'https://platform.twitter.com/widgets.js',
                    async: true
                }
            ]
        }
    }
}
</script>

<style scoped>
.twitter-container {
    padding: 1.5rem;
    min-height: 1438.98px;
}
</style>