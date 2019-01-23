<template>
    <div class="wrapper" style="min-height:100%;">

        <!-- Main Header -->
        <v-header/>
        <!-- Left side column. contains the logo and sidebar -->
        <v-left-side-bar/>

        <div class="content-wrapper">
            <transition name="fade" mode="out-in">
                <component :is="user == null ? 'v-loading' : 'v-content-inner-wrap'"/>
            </transition>
        </div>
        <v-footer/>
    </div>

</template>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'
    import LeftSideBar from '@/components/LeftSideBar'
    import Loading from '@/frames/Loading'
    import ContentInnerWrap from '@/frames/ContentInnerWrap'

    export default {
        name: "ContentWarp",
        components: {
            'v-header': Header,
            'v-footer': Footer,
            'v-left-side-bar': LeftSideBar,
            'v-loading': Loading,
            'v-content-inner-wrap': ContentInnerWrap
        },
        methods: {
            fixBody() {
                // $('body').layout('fix')
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        }
    }
</script>

<style scoped lang="scss">
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
        transition: all .3s;
    }

    .fade-leave-to {
        opacity: 0;
    }
</style>
