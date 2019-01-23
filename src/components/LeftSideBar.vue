<template>
    <aside class="main-sidebar">
        <section class="sidebar">
            <div class="sidebar-form">
                <div class="image">
                    <img :src="previewImage" class="img-responsive" alt="预览图片">
                </div>
            </div>
            <ul class="sidebar-menu" data-widget="tree">
                <li class="header">function-viewer-v1.0</li>
                <template v-for="item in menuList">
                    <template v-if="item.menuUrl">
                        <li :class="currentUrl === item.menuUrl ? 'active menu-open treeview' : 'treeview'">
                            <a href="javascript:void(0);" @click="jumpToRouter(item.menuUrl)" :class="currentUrl == item.menuUrl? 'active' : ''">
                                <i :class="['iconfont', item.menuIcon]"></i>
                                <span>{{item.menuName}}</span>
                            </a>
                        </li>
                    </template>
                    <template v-else-if="item.menuSubLink">
                        <li :class="['treeview', item.defaultActive ? 'active menu-open':'']">
                            <a href="#" :class="currentUrl == item.menuUrl? 'active' : ''">
                                <i :class="['iconfont', item.menuIcon]"></i>
                                <span>{{item.menuName}}</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>

                            <ul class="treeview-menu" :style="item.defaultActive? '':''">
                                <li v-for="(subitem, subindex) in item.menuSubLink"
                                    :class="currentUrl == subitem.menuUrl ? 'active' : ''">
                                    <router-link :to="subitem.menuUrl">
                                        <i :class="['iconfont', subitem.menuIcon]"></i>
                                        <a href="#"></a>{{subitem.menuName}}
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </template>
                </template>
            </ul>
        </section>
    </aside>
</template>

<script>
    import {MENULIST} from "../assets/menuList";

    export default {
        name: "LeftSideBar",
        data() {
            return {
                previewImage: require('@/assets/images/preview.png'),
                menuList: MENULIST,
                currentUrl: '/'
            }
        },
        created: function () {
            this.reMark()
        },
        watch: {
            '$route'(to, from) {
                this.reMark()
                $('body').layout('fix')
            }
        },
        methods: {
            clearDefaultActive() {
                this.menuList.forEach(item => {
                    this.$delete(item, 'defaultActive')
                })
            },
            reMark: function () {
                this.currentUrl = this.$route.fullPath;
                this.clearDefaultActive();
                console.log("currentUrl:" + this.currentUrl)
                this.$nextTick(() => {
                    this.menuList.forEach((item, index) => { // 增加标记位,判断当前url然后自动展开或者激活对应项(刷新默认展开当前url的项)
                        if (!item.menuSubLink && item.menuUrl) {
                            this.currentUrl === item.menuUrl ? this.$set(item, 'defaultActive', true) : '';
                        } else {
                            if (item.menuSubLink) {
                                item.menuSubLink.forEach((subitem, index) => {
                                    this.currentUrl === subitem.menuUrl ? this.$set(item, 'defaultActive', true) : '';
                                })
                            }
                        }
                    })
                })
            },
            jumpToRouter: function (loc) {
                this.$router.push(loc)
            }
        }
    }
</script>

<style scoped>
    .image-panel {

    }

</style>
