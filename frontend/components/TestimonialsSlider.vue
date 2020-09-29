<template>
    <b-carousel
        id="testimonials-slider"
        v-model="slide"
        controls
        img-width="2560"
        img-height="1600"
        no-animation
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd">
        <b-img src="~/assets/tarotbg.jpg" width="2560" height="1600" alt="Tarot BG" fluid></b-img>
        <div class="tarot-deck">
            <div v-for="i in 5" :key="i" class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <b-img src="~/assets/tarot-card-back.jpg" alt="Tarot Card" fluid></b-img>
                    </div>
                    <div class="flip-card-back">
                        <blockquote class="blockquote p-4 text-center">
                            <p class="mb-0">{{ testimonialText }}</p>
                            <footer class="blockquote-footer">{{ testimonialAuthor }}</footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
        <b-carousel-slide v-for="(testimonial, i) in testimonials" :key="testimonial.author" :class="{ active: i === 0 }"></b-carousel-slide>
    </b-carousel>
</template>

<script>
import anime from 'animejs';

export default {
    data() {
        return {
            tl: null,
            slide: 0,
            testimonialText: '',
            testimonialAuthor: '',
            testimonials: [
                {
                    text: 'Thanks so much! She was thrilled! Awhile back you did a cameo from her to me...the world’s best pharmacist? Lol, keep up the awesome work you are doing! Loved the manifestation board video! Love you 💕💕',
                    author: 'Elon Musk',
                },
                {
                    text: 'Wow! Absolutely loved it! It was long, he covered the personal remarks I made about my good Judy, and made hilarious jokes. Thanks, Ant!',
                    author: 'Jeff Bezos',
                },
                {
                    text: 'Wonderful heartfelt message. Thank you!',
                    author: 'Steev',
                },
            ],
        };
    },
    methods: {
        onSlideStart() {
            // Play transition
            anime({
                targets: '.flip-card:last-child',
                easing: 'easeInOutQuad',
                keyframes: [
                    {
                        translateX: -125,
                        translateY: -900,
                    },
                    {
                        zIndex: 0,
                        duration: 0,
                    },
                    {
                        translateX: -125,
                        translateY: -210,
                    }
                ],
                duration: 1000,
                complete: (anim) => {
                    this.testimonialText = this.testimonials[this.slide].text;
                    this.testimonialAuthor = this.testimonials[this.slide].author;
                    anime.set('.flip-card:last-child', {
                        zIndex: 100,
                    });
                    this.tl.restart();
                }
            });
        },
        onSlideEnd() {
        },
        setupAnimation() {
            this.testimonialText = this.testimonials[0].text;
            this.testimonialAuthor = this.testimonials[0].author;
            anime.set('.flip-card', {
                translateX: anime.stagger(-3, { start: -125 }),
                translateY: anime.stagger(-3, { start: -210 }),
            });
            this.tl = anime.timeline({
                easing: 'easeInOutQuad',
            });
            this.tl
            .add({
                targets: '.flip-card',
                translateX: function(el, i, l) {
                    if (i % 2) {
                        return -250 / 2 - 250 / 2 * Math.random() - 125;
                    }
                    return 250 / 2 + 250 / 2 * Math.random() - 125;
                },
                translateY: -150,
                duration: 350,
            })
            .add({
                targets: '.flip-card',
                keyframes: [
                    {
                        zIndex: function(el, i, l) {
                            if (i % 2) {
                                return 105;
                            }
                            return 100;
                        },
                        duration: 0
                    },
                    {
                        translateX: anime.stagger(-3, { start: -125 }),
                        translateY: anime.stagger(-3, { start: -210 }),
                    }
                ],
                duration: 350,
                delay: anime.stagger(50),
            })
            .add({
                targets: '.flip-card',
                translateX: function(el, i, l) {
                    if (i % 2) {
                        return -250 / 2 - 250 / 2 * Math.random() - 125;
                    }
                    return 250 / 2 + 250 / 2 * Math.random() - 125;
                },
                translateY: -150,
                duration: 350,
            })
            .add({
                targets: '.flip-card',
                keyframes: [
                    {
                        zIndex: 100,
                        duration: 0
                    },
                    {
                        translateX: anime.stagger(-3, { start: -125 }),
                        translateY: anime.stagger(-3, { start: -210 }),
                    }
                ],
                duration: 350,
                delay: anime.stagger(50),
            })
            .add({
                targets: '.flip-card:last-child .flip-card-inner',
                rotateY: 180,
                duration: 1000,
            });
        }
    },
    mounted() {
        this.setupAnimation();
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
    transform: translate(-50%, -50%);
    background-color: transparent;
    width: 250px;
    height: 420px;
    perspective: 1000px;
    z-index: 100;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
}

.flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
}

.flip-card-back {
    background-color: #f9f9f9;
    transform: rotateY(180deg);
}

.blockquote {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
}
</style>