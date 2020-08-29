<template>
    <div id="commento"></div>
</template>

<script>
export default {
    head: {
        script: [
            {
                hid: 'commento',
                src: 'https://commento.tiffanietru.com/js/commento.js',
                defer: true,
                'data-css-override': 'https://tiffanietru.com/css/commento.css',
                'data-auto-init': true
            },
        ],
    }
}
</script>