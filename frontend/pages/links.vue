<template>
    <b-container class="text-center py-5 px-sm-5">
        <img class="rounded-circle" src="~/assets/pfp.jpg" width="100" height="100" alt="Avatar">
        <div class="text-muted mb-4">@foxyfury</div>
        
        <ul class="list-unstyled">
            <li class="mb-2">
                <OFButton />
            </li>
            <li v-for="link in links" :key="link.url" class="mb-2">
                <b-button target="_blank" rel="noopener noreferrer" :href="link.url" :style="{backgroundColor: link.bgColor, borderColor: link.bgColor}" class="text-white w-100 p-4">
                     <font-awesome-icon :icon="link.iconClasses" /> {{ link.name }}
                </b-button>
            </li>
        </ul>
    </b-container>    
</template>

<script>
import OFButton from '~/components/OFButton.vue';
import seoQuery from '~/apollo/queries/seo/seo.gql';

export default {
    head() {
        return {
            title: `Links - ${this.seo.siteName}`,
            meta: [
                {
                    hid: 'og-title',
                    property: 'og:title',
                    content: `Links - ${this.seo.siteName}`
                }
            ],
        }
    },
    data() {
        return {
            links: [
                {
                    name: 'Youtube 💤 ASMR Content',
                    url: 'https://youtube.com/channel/UCFKGBwzld3DoJEMfHt-PqlA',
                    iconClasses: ['fab', 'youtube'],
                    bgColor: '#cc181e'
                },
                {
                    name: 'Patreon 💤 ASMR Content',
                    url: 'https://www.patreon.com/asmrtiff',
                    iconClasses: ['fab', 'patreon'],
                    bgColor: '#f96854'
                },
                {
                    name: 'Twitch',
                    url: 'https://www.twitch.tv/foxyfurytv',
                    iconClasses: ['fab', 'twitch'],
                    bgColor: '#6441a3'
                },
                {
                    name: 'Discord',
                    url: 'https://discord.gg/hu564JN',
                    iconClasses: ['fab', 'discord'],
                    bgColor: 'rgb(114, 137, 218)'
                },
                {
                    name: 'Instagram',
                    url: 'https://www.instagram.com/foxyfurytv',
                    iconClasses: ['fab', 'instagram'],
                    bgColor: '#f00075'
                },
                {
                    name: 'ASMR Insta',
                    url: 'https://instagram.com/tiffsasmr',
                    iconClasses: ['fab', 'instagram'],
                    bgColor: '#f58529'
                },
                {
                    name: 'Send me a Gift! (Anonymous or not)',
                    url: 'https://stream.gifts/t/foxyfurytv',
                    iconClasses: ['fa', 'gift'],
                    bgColor: '#24effe'
                },
                {
                    name: 'Twitter',
                    url: 'https://www.twitter.com/foxyfury',
                    iconClasses: ['fab', 'twitter'],
                    bgColor: '#2ac0ff'
                },
                {
                    name: 'Amazon Wish List',
                    url: 'https://www.amazon.com/hz/wishlist/ls/14XKN3WWOJPH2/ref=cm_go_nav_hz',
                    iconClasses: ['fab', 'amazon'],
                    bgColor: '#ff9900'
                },
                {
                    name: 'Amazon Affiliate Links',
                    url: 'https://docs.google.com/document/d/1mXO-NOmbs20Vj2C6axLqChSZQOgoggZmu_TPiCQKTyo/edit?usp=sharing',
                    iconClasses: ['fab', 'amazon'],
                    bgColor: '#131A22'
                }]
        }
    },
    components: {
        OFButton
    },
    apollo: {
        seo: {
            prefetch: true,
            query: seoQuery
        }
    }
}
</script>

<style scoped>
    .btn {
        border-radius: 40px;
        transition: opacity 0.2s ease-in-out;
        max-width: 690px !important;
        box-shadow: none !important;
    }

    .btn:hover {
        opacity: 0.75 !important;
    }
</style>