<template>
    <LoadingComponent></LoadingComponent>
</template>

<script>
import { mapMutations } from 'vuex';
import LoadingComponent from '~/components/LoadingComponent.vue';

export default {
    data() {
        return {
            apiUrl: process.env.strapiBaseUri,
            provider: this.$route.params.provider,
            accessToken: this.$route.query.access_token,
            refreshToken: this.$route.query.refresh_token,
        };
    },
    methods: {
        ...mapMutations({
            setUser: 'auth/setUser'
        })
    },
    mounted() {
        fetch(`${this.apiUrl}/auth/${this.provider}/callback?access_token=${this.accessToken}&refresh_token=${this.refreshToken}`)
            .then(response => response.json())
            .then(data => {
                if (data.jwt && data.user) {
                    this.$apolloHelpers.onLogin(data.jwt);
                    this.setUser(data.user)
                    this.$router.replace('/');
                }
            })
            .catch(err => {
                console.error(err);
                this.$router.replace('/login');
            });
    },
    components: {
        LoadingComponent
    }
}
</script>