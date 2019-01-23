<template>
    <div>
        <section class="content-header" style="padding-top:0;padding-left:0;padding-right:0">
            <ol class="breadcrumb breadcrumb1">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">Dashboard</li>
            </ol>
        </section>

        <section class="content">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">请输入方程</h3>
                </div>

                <form role="form">
                    <div class="box-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">方程（带x和y自变量）</label>
                            <input type="email" class="form-control" id="exampleInputEmail1"
                                   placeholder="Enter function">
                        </div>
                        <div class="form-group">

                            <button type="submit" class="btn btn-primary">提交</button>
                        </div>
                    </div>

                </form>
                <div class="overlay" v-show="!loaded">
                    <i class="fa fa-refresh fa-spin"></i>
                </div>
            </div>

            <div class="box box-prmary">
                <div class="box-header with-border">
                    <h3 class="box-title">图像</h3>
                </div>
                <div class="box-body">
                    <img src="http://10.0.75.1:8080/img/preview.4afeff0e.png"/>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

    export default {
        name: 'HelloWorld',
        data() {
            return {
                loaded: false
            }
        },
        components: {},
        async created() {
            console.log('start create');
            await this.tools.sleep(1000);
            this.loaded = true;
            console.log('view created');
        },
        async mounted() {
            console.log("start mount");
            await this.tools.sleep(1000);
            console.log('mounted')
        },
        async beforeCreate() {
            console.log('before create');
            await this.tools.sleep(1000);
            console.log('before created');
        }
    }
</script>

<style scoped lang="scss">
    .breadcrumb1 {
        position: relative !important;
        margin-top: 0 !important;
        top: 0 !important;
        right: 0 !important;
        float: none !important;
        background: #d2d6de !important;
        padding-left: 10px !important;
    }
</style>
