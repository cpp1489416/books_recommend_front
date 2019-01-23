<template>
    <div>
        <section class="content-header">
            <h1>
                this is hello page
                <small>请输入函数方程式</small>
            </h1>
        </section>

        <section class="content">
            <input type="text" placeholder="please input username" v-model="userName"/>
            <button @click="click">点我</button>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                isa: true,
                userName: ''
            }
        },
        components: {},
        methods: {
            click: function () {
                alert('clicked');
                alert(this.$store.state.userName);
            }
        }
    }
</script>

<style scoped lang="scss">
    div {
        min-height: 100%;
    }
</style>
