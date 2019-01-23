<template>
    <header class="main-header">

        <!-- Logo -->
        <a href="javascript:void(0);" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini">FVR </span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg">函数图像展示器</span>
        </a>

        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="https://github.com/cxc6922" v-show="user != null">
                            <i class="fa fa-github"></i>
                        </a>
                        <a href="#" v-show="user == null">
                            <i class="fa fa-refresh fa-spin"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Header",
        methods: {},
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        mounted() {
        },
        async created() {
            console.log('start ajax');
            let res = await this.axios.post(
                '/bdapi/common/getCurrentUserInfo',
                {}
            );
            const resinf = res.data.info;
            //  await this.tools.sleep(1000);
            console.log(resinf);
            this.$store.commit(
                'setUser', {
                    name: resinf.userName,
                    id: resinf.userCode
                }
            );
            console.log('end');
        }
    }
</script>

<style scoped>

</style>
