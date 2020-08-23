<template>
    <div class="bg-dark">
        <ul class="socialbar">
            <li v-b-popover.hover.bottom="'Twitch'">
                <a 
                    class="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.twitch.tv/foxyfurytv">
                    <font-awesome-icon :icon="['fab', 'twitch']" />
                </a>
            </li>
            <li>
                <b-dropdown v-b-popover.hover.bottom="'Instagram'"
                    toggle-tag="a" toggle-class="social-link p-0">
                    <template slot="button-content">
                        <font-awesome-icon :icon="['fab', 'instagram']" />
                    </template>
                    <b-dropdown-item
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.instagram.com/foxyfurytv">
                        Instagram
                    </b-dropdown-item>
                    <b-dropdown-item
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.instagram.com/tiffsasmr">
                        ASMR Insta
                    </b-dropdown-item>
                </b-dropdown>
            </li>
            <li v-b-popover.hover.bottom="'Twitter'">
                <a
                    class="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/FoxyFury">
                    <font-awesome-icon :icon="['fab', 'twitter']" />
                </a>
            </li>
            <li v-b-popover.hover.bottom="'YouTube'">
                <a
                    class="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.youtube.com/channel/UCFKGBwzld3DoJEMfHt-PqlA">
                    <font-awesome-icon :icon="['fab', 'youtube']" />
                </a>
            </li>
            <li v-b-popover.hover.bottom="'Patreon'">
                <a
                    class="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.patreon.com/asmrtiff">
                    <font-awesome-icon :icon="['fab', 'patreon']" />
                </a>
            </li>
            <li v-b-popover.hover.bottom="'OnlyFans'">
                <a
                    class="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://onlyfans.com/foxyfury">
                    <font-awesome-icon :icon="['fa', 'lock']" />
                </a>
            </li>
        </ul>
    </div>
</template>

<style>
.socialbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    list-style-type: none;
    padding: 0.2rem 0.75rem;
    margin: 0;
}

.socialbar li {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

.social-link {
    color: rgba(255, 255, 255, 0.5);
    font-family: inherit;
    background-color: transparent;
    border-color: transparent;
}

.social-link:hover {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
}
</style>