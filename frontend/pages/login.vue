<template>
    <b-container class="auth-form py-5">
        <div class="text-center">
            <b-img src="~/assets/foxyfuryasmrlogoblack.png" width="100" class="rounded-circle" alt="Logo"></b-img>
            <h1>Sign in</h1>
            <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>Incorrect email or password.</b-alert>
        </div>
        <b-card class="mb-2 shadow-sm">
            <b-form @submit.prevent="onSubmit">
                <b-form-group
                    id="email-group"
                    label="Email address"
                    label-for="email-input">

                    <b-form-input
                        id="email-input"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Enter email">
                    </b-form-input>

                </b-form-group>

                <b-form-group
                    id="password-group"
                    label="Password"
                    label-for="password-input">

                    <b-form-input
                        id="password-input"
                        v-model="form.password"
                        type="password"
                        required
                        placeholder="Enter password">
                    </b-form-input>

                </b-form-group>

                <b-button type="submit" variant="primary" class="mb-2 w-100 text-white">Sign in</b-button>
                <p class="mb-2 text-muted text-center">Or</p>
                <b-button :href="`${apiUrl}/connect/twitch`" class="twitch-btn"><font-awesome-icon :icon="['fab', 'twitch']" /> Connect with Twitch</b-button>
            </b-form>
        </b-card>
        <b-card no-body class="p-2 shadow-sm text-muted text-center">
            <b-card-text>Or <b-link to="/register">Create an account</b-link>.</b-card-text>
        </b-card>
    </b-container>
</template>

<script>
import { mapMutations } from 'vuex';
import LoginMutation from '~/apollo/mutations/auth/login.gql';
import seoQuery from '~/apollo/queries/seo/seo.gql';

export default {
    head() {
        return {
            title: `Sign in - ${this.seo.siteName}`,
            meta: [
                {
                    hid: 'og-title',
                    property: 'og:title',
                    content: `Sign in - ${this.seo.siteName}`
                }
            ],
        };
    },
    data() {
        return {
            apiUrl: process.env.strapiBaseUri,
            seo: {},
            showDismissibleAlert: false,
            form: {
                email: '',
                password: '',
            }
        };
    },
    methods: {
        onSubmit(evt) {
            this.$apollo.mutate({
                mutation: LoginMutation,
                variables: {
                    input: {
                        identifier: this.form.email,
                        password: this.form.password,
                        provider: 'local'
                    }
                }
            }).then((response) => {
                if (response.data.login && response.data.login.jwt && response.data.login.user) {
                    const jwt = response.data.login.jwt;
                    const user = response.data.login.user;
                    this.$apolloHelpers.onLogin(jwt);
                    this.setUser(user);
                    this.$router.go(-1);
                }
            }).catch(response => {
                console.log(JSON.stringify(response));
                this.showDismissibleAlert = true;
            });
        },
        ...mapMutations({
            setUser: 'auth/setUser',
        })
    },
    apollo: {
        seo: {
            prefetch: true,
            query: seoQuery
        }
    }
}
</script>

<style>
    .auth-form {
        max-width: 340px;
    }

    .auth-form label {
        font-weight: bold !important;
    }

    .twitch-btn {
        background-color: #9146FF;
        border-color: #9146FF;
        width: 100%;
        color: #fff;
    }

    .twitch-btn:hover, .twitch-btn:focus {
        background-color: #7313ff;
        border-color: #7313ff;
    }
</style>