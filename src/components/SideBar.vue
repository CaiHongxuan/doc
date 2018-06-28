<template>

    <el-aside>
        <el-menu :default-openeds="openeds">
            <el-submenu v-for="sidebar in sidebars" v-if="sidebar.children && sidebar.children.length" :key="sidebar.id" :index="''+sidebar.id">
                <template slot="title"><i class="el-icon-message"></i>{{ sidebar.name }}</template>
                <el-submenu v-for="child in sidebar.children" v-if="child.children && child.children.length" :key="child.id" :index="''+child.id">
                    <template slot="title"><i class="el-icon-message"></i>{{ child.name }}</template>

                    <el-submenu v-for="item in child.children" v-if="item.children && item.children.length" :key="item.id" :index="''+item.id">
                        <template slot="title"><i class="el-icon-message"></i>{{ item.name }}</template>
                        <el-menu-item v-for="single in item.children" :key="single.id" :index="''+single.id" @click="loadDocs(single.id)">
                            <i class="el-icon-document"></i>{{ single.name }}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :key="item.id" :index="''+item.id" @click="loadDocs(item.id)">
                        <i class="el-icon-document"></i>{{ item.name }}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="child.id" :index="''+child.id" @click="loadDocs(child.id)">
                    <i class="el-icon-document"></i>{{ child.name }}
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="sidebar.id" :index="''+sidebar.id" @click="loadDocs(sidebar.id)">
                <i class="el-icon-document"></i>{{ sidebar.name }}
            </el-menu-item>
        </el-menu>
    </el-aside>

</template>

<script>
    export default {
        name: 'SideBar',
        props: {
            sidebars: {
                type: Object|Array,
                required: true
            }
        },
        data() {
            return {
                openeds: []
            }
        },
        methods: {
            loadDocs (cat_id) {
                this.$emit('loadDocs', cat_id);
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
