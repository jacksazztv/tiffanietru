<template>
    <b-form @submit.prevent="onSearch">
        <b-input-group>
            <template v-slot:append>
                <b-button class="search-btn" type="submit">
                    <font-awesome-icon :icon="['fa', 'search']" />
                </b-button>
            </template>
            <label class="sr-only" for="search">Search</label>
            <b-form-input
                id="search"
                name="search"
                placeholder="Search…"
                v-model="searchQuery">
            </b-form-input>
        </b-input-group>
    </b-form>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        onSearch() {
            const search = this.searchQuery.trim();
            if (search) {
                this.$router.push({ path: '/writings/search', query: { q: search } });
                this.searchQuery = '';
            }
        }
    }
}
</script>

<style scoped>
    .search-btn {
        color: #495057 !important;
        background-color: #e9ecef !important;
        border: 1px solid #ced4da !important;
        transition: opacity 0.2s ease-in-out;;
    }

    .search-btn:hover {
        opacity: 0.75;
    }

    .search-btn:focus {
        box-shadow: none !important;
    }

    .form-control:focus {
        box-shadow: none !important;
        border-color: #ced4da !important;
    }
</style>