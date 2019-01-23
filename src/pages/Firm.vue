<template>
    <div class="wrapper" style="min-height:100%;">

        <!-- Main Header -->
        <v-header/>
        <!-- Left side column. contains the logo and sidebar -->
        <v-left-side-bar/>

        <div class="content-wrapper">
            <section class="content-header">
                <h1>
                    this is hello page
                    <small>请输入函数方程式</small>
                </h1>
            </section>

            <section class="content">
                <button @click="isa = !isa">点我</button>
            </section>
        </div>

        <v-footer/>
    </div>

</template>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'
    import LeftSideBar from '@/components/LeftSideBar'

    export default {
        name: "ConentWarp",
        components: {
            'v-header': Header,
            'v-footer': Footer,
            'v-left-side-bar': LeftSideBar
        },
        methods: {
            fixBody() {
                // $('body').layout('fix')
            }
        }
    }
</script>

<style>
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
