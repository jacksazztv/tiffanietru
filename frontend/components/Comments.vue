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
                defer: true
            },
        ],
    }
}
</script>