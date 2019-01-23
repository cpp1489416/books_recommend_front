<template>
    <div id="app">
        <router-view style="min-height:100%;"/>
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {
        },
        mounted() {
            $('body').layout('fix')
        },
        watch: {
            '$route'(to, from) {
                $('body').layout('fix')
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        min-height: 100%;
    }
</style>
