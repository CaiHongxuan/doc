<template>

    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        show-timeout=0
    >
        <el-submenu v-for="menu in menus" :key="menu.id" v-if="menu.children && menu.children.length" :index="menu.id">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span>{{ menu.name }}</span>
            </template>
            <el-submenu v-for="child in menu.children" :key="child.id" v-if="child.children && child.children.length" :index="child.id">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>{{ child.name }}</span>
                </template>
                <el-menu-item v-for="item in child.children" :key="item.id" :index="item.id">
                    <router-link :to="item.link">{{ item.name }}</router-link>
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="child.id">
                <router-link :to="child.link">{{ child.name }}</router-link>
            </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="menu.id">
            <router-link :to="menu.link">{{ menu.name }}</router-link>
        </el-menu-item>
        <!-- <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span>文档中心</span>
            </template>
            <el-menu-item index="2-1">开发规范</el-menu-item>
            <el-submenu index="2-2">
                <template slot="title">十分到家文档</template>
                <el-menu-item index="2-2-1">App接口文档（师傅端）</el-menu-item>
                <el-menu-item index="2-2-2">服务端核心逻辑调用</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
    </el-menu>

</template>

<script>
    export default {
        name: 'NavBar',
        data() {
            return {
                activeIndex: '1',
                menus: [
                    {
                        id:'1',
                        name:'首页',
                        link:'/',
                        children:[]
                    },
                    {
                        id:'2',
                        name:'文档中心',
                        link:'/',
                        children: [
                            {
                                id:'3',
                                name:'开发规范',
                                link:'/add?pro_id=1',
                                children:[]
                            },
                            {
                                id:'4',
                                name:'十分到家文档',
                                link:'/',
                                children:[
                                    {
                                        id:'5',
                                        name:'App接口文档（师傅端）',
                                        link:'/',
                                        children:[]
                                    },
                                    {
                                        id:'6',
                                        name:'服务端核心逻辑调用',
                                        link:'/',
                                        children:[]
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        id:'7',
                        name:'消息中心',
                        link:'/doclist/1',
                        children:[]
                    }
                ]
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    a {
        color: #fff;
        text-decoration: none;
        display: block;
    }
    a:hover {
        color: rgb(255, 208, 75);
    }
    .el-menu-item.is-active a {
        color: rgb(255, 208, 75);
    }
</style>
