<template>
    <div class="tarot-deck">
        <div v-for="i in 5" :key="i" class="flip-card shadow">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <b-img src="~/assets/tarot-card-back.jpg" alt="Tarot Card"></b-img>
                </div>
                <div class="flip-card-back">
                    <h1>Hello</h1>
                    <p>What up</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';

export default {
    methods: {
        playAnimation() {
            anime.set('.flip-card', {
                translateX: anime.stagger(-3, { start: -125 }),
                translateY: anime.stagger(-3, { start: -210 }),
            });
            const tl = anime.timeline({
                easing: 'easeInOutQuad',
                loop: true,
                direction: 'alternate',
            });
            tl
            .add({
                targets: '.flip-card',
                translateX: function(el, i, l) {
                if (i % 2) {
                    return -250 / 2 - 250 / 2 * Math.random() - 125;
                }
                return 250 / 2 + 250 / 2 * Math.random() - 125;
                },
                translateY: -150,
                duration: 200,
            })
            .add({
                targets: '.flip-card',
                translateX: anime.stagger(-3, { start: -125 }),
                translateY: anime.stagger(-3, { start: -210 }),
                duration: 200,
            })
            .add({
                targets: '.flip-card:last-child .flip-card-inner',
                rotateY: 180,
                duration: 1000,
            });
        }
    },
    mounted() {
        this.playAnimation();
    }
}
</script>

<style scoped>
.tarot-deck {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.flip-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: transparent;
    width: 250px;
    height: 420px;
    perspective: 1000px;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transform-style: preserve-3d;
}

.flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
}

.flip-card-front {
    background-color: #bbb;
    color: black;
}

.flip-card-back {
    background-color: dodgerblue;
    color: white;
    transform: rotateY(180deg);
}
</style>