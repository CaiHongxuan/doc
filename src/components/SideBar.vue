<template>

    <el-aside>
        <el-menu :default-openeds="openeds">
            <el-submenu v-for="sidebar in sidebars" v-if="sidebar.children.length" :key="sidebar.id" :index="sidebar.id">
                <template slot="title"><i class="el-icon-message"></i>{{ sidebar.name }}</template>
                <el-submenu v-for="child in sidebar.children" v-if="child.children.length" :key="child.id" :index="child.id">
                    <template slot="title"><i class="el-icon-message"></i>{{ child.name }}</template>

                    <el-submenu v-for="item in child.children" v-if="item.children.length" :key="item.id" :index="item.id">
                        <template slot="title"><i class="el-icon-message"></i>{{ item.name }}</template>
                        <el-menu-item v-for="single in item.children" :key="single.id" :index="single.id">
                            <i class="el-icon-document"></i>{{ single.name }}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :key="item.id" :index="item.id">
                        <i class="el-icon-document"></i>{{ item.name }}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="child.id" :index="child.id">
                    <i class="el-icon-document"></i>{{ child.name }}
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="sidebar.id" :index="sidebar.id">
                <i class="el-icon-document"></i>{{ sidebar.name }}
            </el-menu-item>
        </el-menu>
    </el-aside>

</template>

<script>
    export default {
        name: 'SideBar',
        data() {
            return {
                openeds: ['1', '2'],
                sidebars: [
                    {
                        id: '1',
                        name: '导航一',
                        children: [
                            {
                                id: '2',
                                name: '导航1-1',
                                children: [
                                    {
                                        id: '3',
                                        name: '导航1-1-1',
                                        children: [
                                            {
                                                id: '7',
                                                name: '导航1-1-1-1',
                                                children: []
                                            },
                                            {
                                                id: '10',
                                                name: '导航1-1-1-2',
                                                children: []
                                            }
                                        ],
                                    },
                                    {
                                        id: '6',
                                        name: '导航1-1-2',
                                        children: [],
                                    },
                                    {
                                        id: '8',
                                        name: '导航1-1-3',
                                        children: [],
                                    },
                                    {
                                        id: '9',
                                        name: '导航1-1-4',
                                        children: [],
                                    }
                                ]
                            },
                            {
                                id: '4',
                                name: '导航1-2',
                                children: []
                            }
                        ]
                    },
                    {
                        id: '5',
                        name: '导航二',
                        children: [
                            {
                                id: '11',
                                name: '导航2-1',
                                children: []
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    a {
        color: #303133;
        text-decoration: none;
        display: block;
    }
    .is-active a {
        color: #409EFF;
    }
</style>
