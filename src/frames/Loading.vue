<template>
    <section class="content">
        <div class="x-overlay-loading">
            <i class="fa fa-refresh fa-spin"></i>
            <h4>正在加载...</h4>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped lang="scss">
    .x-overlay-loading {
        width: 100%;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        .fa {
            text-align: center;
            font-size: 30px;
            color: #000;
        }
        h4 {
            padding-top: 5px;
            font-size: 20px;
            font-family: 'Source Sans Pro', sans-serif;
            display: none; // 先隐藏
        }
    }
</style>
