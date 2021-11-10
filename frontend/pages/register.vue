<template>
    <b-container class="auth-form py-4">
        <div class="text-center">
            <b-img src="~/assets/neonfox.svg" width="150" class="rounded-circle" alt="Logo"></b-img>
            <h1>Register</h1>
            <b-alert v-model="accountRegistered" variant="success" dismissible>Thank you for registering!</b-alert>
            <b-alert v-model="registrationFailed" variant="danger" dismissible>{{ errorMsg }}</b-alert>
        </div>
        <b-card class="mb-2 shadow-sm">
            <b-form @submit.prevent="onSubmit">
                <b-form-group
                    id="username-group"
                    label="Username"
                    label-for="username-input">

                    <b-form-input
                        id="username-input"
                        v-model="form.username"
                        type="text"
                        required
                        placeholder="Enter username">
                    </b-form-input>

                </b-form-group>

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

                <b-button type="submit" variant="primary" class="mb-2 w-100 text-white">Create account</b-button>
            </b-form>
        </b-card>
    </b-container>
</template>

<script>
import { mapMutations } from 'vuex';
import RegisterMutation from '~/apollo/mutations/auth/register.gql';
import seoQuery from '~/apollo/queries/seo/seo.gql';

export default {
    head() {
        return {
            title: `Register - ${this.seo.siteName}`,
            meta: [
                {
                    hid: 'og-title',
                    property: 'og:title',
                    content: `Register - ${this.seo.siteName}`
                }
            ],
        };
    },
    data() {
        return {
            apiUrl: process.env.strapiBaseUri,
            seo: {},
            accountRegistered: false,
            emailConfirmation: false,
            registrationFailed: false,
            errorMsg: 'Registration failed!',
            form: {
                username: '',
                email: '',
                password: '',
            }
        };
    },
    methods: {
        onSubmit(evt) {
            this.accountRegistered = false;
            this.emailConfirmation = false;
            this.registrationFailed = false;
            this.errorMsg = 'Registration failed!';

            this.$apollo.mutate({
                mutation: RegisterMutation,
                variables: {
                    input: {
                        username: this.form.username,
                        email: this.form.email,
                        password: this.form.password
                    }
                }
            }).then((response) => {
                console.log(JSON.stringify(response));

                if (!response.data.register) {
                    this.registrationFailed = true;
                    return;
                }

                if (response.data.register.user.confirmed) {
                    this.accountRegistered = true;
                    
                    if (response.data.register.jwt && response.data.register.user) {
                        this.$apolloHelpers.onLogin(response.data.register.jwt);
                        this.setUser(response.data.register.user);
                    }

                    this.$router.push('/');
                } else {
                    this.emailConfirmation = true;
                }
            }).catch((response) => {
                console.error(JSON.stringify(response));

                if (response.graphQLErrors && response.graphQLErrors.length) {
                    this.errorMsg = response.graphQLErrors[0].extensions.exception.data.data[0].messages[0].message;
                }

                this.registrationFailed = true;
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
</style>