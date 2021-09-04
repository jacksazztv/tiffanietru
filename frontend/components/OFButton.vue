<template>
    <b-button target="_blank" rel="noopener noreferrer" href="https://onlyfans.com/petitetiff" class="text-dark w-100 px-4 py-2 bg-white overflow-hidden" style="background-color: #fff; border: 2px solid #2aace2">
        <div id="parent">
            <div id="wrapper" class="d-flex flex-row align-items-center">
                <div class="of-logo-wrapper">
                    <OFLogo class="of-logo" height="50" />
                </div>
                <div class="of-info flex-shrink-0 ml-auto mr-auto">
                    <img src="~/assets/ofpfp.jpg" width="40" height="40" alt="petitetiff">
                    <span class="letter">@</span><span class="letter">p</span><span class="letter">e</span><span class="letter">t</span><span class="letter">i</span><span class="letter">t</span><span class="letter">e</span><span class="letter">t</span><span class="letter">i</span><span class="letter">f</span><span class="letter">f</span>
                </div>
                <div class="of-btn-wrapper flex-shrink-0">
                    <button class="of-subscribe-btn"><span class="letter">S</span><span class="letter">u</span><span class="letter">b</span><span class="letter">s</span><span class="letter">c</span><span class="letter">r</span><span class="letter">i</span><span class="letter">b</span><span class="letter">e</span></button>
                    <button class="of-btn-overlay">Subscribed!</button>
                </div>
            </div>
        </div>
    </b-button>
</template>

<script>
import anime from 'animejs';
import OFLogo from '~/assets/oflogo.svg?inline';

export default {
    methods: {
        playAnimation() {
            anime.set('.of-logo .blackletter, .of-logo .blueletter', {
                fill: 'none',
            });

            anime.set('.of-logo', {
                opacity: 1,
                translateX: '-50%',
            });

            const tl = anime.timeline({
                easing: 'easeInOutSine',
            });

            tl
                .add({
                    targets: '.of-logo path',
                    strokeDashoffset: [anime.setDashoffset, 0],
                    delay: anime.stagger(250),
                    duration: 1500,
                })
                .add({
                    targets: '.of-logo .blackletter',
                    fill: '#313131',
                    stroke: '#313131',
                    easing: 'linear',
                    duration: 2000,
                }, 3000)
                .add({
                    targets: '.of-logo .blueletter',
                    fill: '#00aff0',
                    easing: 'linear',
                    duration: 2000,
                }, 3000)
                .add({
                    targets: '#wrapper',
                    translateX: '-50%',
                }, 6000)
                .add({
                    targets: '.of-logo',
                    rotateY: '1turn',
                    translateX: 0,
                }, 6000)
                .add({
                    targets: '#gradient',
                    opacity: 1,
                }, 6000)
                .add({
                    targets: '#lettero, #lock',
                    fill: '#fff',
                    stroke: '#fff',
                }, 6000)
                .add({
                    targets: '#lettern, #letterl, #lettery, #bletterf, #blettera, #blettern, #bletters',
                    translateX: '-900px',
                    delay: anime.stagger(50),
                }, 6000)
                .add({
                    targets: '.of-info img',
                    scale: [0, 1],
                    translateY: '0%',
                    easing: 'easeOutElastic',
                }, 7000)
                .add({
                    targets: '.of-info .letter',
                    translateY: ['900px', '0%'],
                    delay: anime.stagger(100),
                    duration: 1500,
                    easing: 'easeOutElastic',
                }, 7000).add({
                    targets: '.of-btn-wrapper, .of-subscribe-btn .letter',
                    translateY: ['-200px', '0%'],
                    easing: 'easeOutElastic',
                    delay: anime.stagger(100),
                }, 8300)
                .add({
                    targets: '.of-btn-overlay',
                    opacity: [0, 1],
                    translateY: ['100%', 0],
                    duration: 500,
                });
        }
    },
    mounted() {
        this.playAnimation();
    },
    components: {
        OFLogo,
    }
}
</script>
<style lang="scss" scoped>
    @import '~bootstrap/scss/functions';
    @import '~bootstrap/scss/variables';
    @import '~bootstrap/scss/mixins/breakpoints';
    
    #parent {
        position: relative;
        height: 60px;
        text-align: left;
    }

    #wrapper {
        position: absolute;
        width: 100%;
        height: 60px;
        top: 0;
        left: 50%;
    }

    .of-logo-wrapper {
        width: 60px;
        overflow: visible;
    }

    .of-logo {
        opacity: 0;
        transform-origin: left;
    }

    .of-info {
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
    }

    .of-info img {
        border-radius: 50%;
        transform: scale(0);
    }

    .of-info .letter {
        display: inline-block;
        transform: translateY(900px);
    }

    .of-btn-wrapper {
        position: relative;
        overflow: hidden;
        transform: translateY(-900px);
    }

    @include media-breakpoint-down(sm) {
        .of-info {
            font-size: 0.8rem;
        }

        .of-btn-wrapper {
            font-size: 0.8rem;
        }
    }

    .of-subscribe-btn {
        background-color: #fff;
        border: 2px dashed #2aace2;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        text-transform: uppercase;
    }

    .of-subscribe-btn .letter {
        display: inline-block;
        transform: translateY(-200px);
    }

    .of-btn-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #2aace2;
        border: 2px solid #2aace2;
        border-radius: 5px;
        color: #fff;
        padding: 0.5rem 0;
        text-transform: uppercase;
        transform: translateY(100%);
    }
</style>