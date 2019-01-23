<template>
    <div>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "ContentInnerWrapper"
    }
</script>

<style scoped>
    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: all .3s;
    }

    .fade-enter-to {
        opacity: 1;
    }

    .fade-leave {
        opacity: 1;
    }

    .fade-leave-active {
        transition: all     .3s;
    }

    .fade-leave-to {
        opacity: 0;
    }
</style>
