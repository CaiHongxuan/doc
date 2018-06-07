<template>

    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">首页</el-menu-item>
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
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
    </el-menu>

</template>

<script>
    export default {
        name: 'NavBar',
        data() {
            return {
                activeIndex: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
