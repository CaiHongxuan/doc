<template>

    <el-aside>
        <el-menu :default-openeds="openeds" @open="handleLoad">
            <el-input v-model="input" placeholder="输入关键字后按回车以搜索" @keyup.enter.native="loadCats"></el-input>
            <div class="new-bar">
                <el-tooltip class="item" effect="dark" content="新建页面" placement="left">
                    <i class="el-icon-plus"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="新建目录" placement="right">
                    <i class="el-icon-message"></i>
                </el-tooltip>
            </div>
            <el-menu-item v-for="doc in sidebars.docs" v-if="sidebars.docs && sidebars.docs.length" :key="'doc_' + doc.id" :index="'doc_'+doc.id" @click="loadDoc(doc.id)">
                <i class="el-icon-document"></i>{{ doc.title }}
            </el-menu-item>
            <el-submenu v-for="sidebar in sidebars.cats" v-if="(sidebar.children && sidebar.children.length) || (sidebar.docs && sidebar.docs.length)" :key="sidebar.id" :index="''+sidebar.id">
                <template slot="title"><i class="el-icon-message"></i>{{ sidebar.name }}</template>
                <el-menu-item v-for="doc in sidebar.docs" v-if="sidebar.docs && sidebar.docs.length" :key="'doc_' + doc.id" :index="'doc_'+doc.id" @click="loadDoc(doc.id)">
                    <i class="el-icon-document"></i>{{ doc.title }}
                </el-menu-item>
                <el-submenu v-for="child in sidebar.children" v-if="(child.children && child.children.length) || (child.docs && child.docs.length)" :key="child.id" :index="''+child.id">
                    <template slot="title"><i class="el-icon-message"></i>{{ child.name }}</template>
                    <el-menu-item v-for="doc in child.docs" v-if="child.docs && child.docs.length" :key="'doc_' + doc.id" :index="'doc_'+doc.id" @click="loadDoc(doc.id)">
                        <i class="el-icon-document"></i>{{ doc.title }}
                    </el-menu-item>
                    <el-submenu v-for="item in child.children" v-if="(item.children && item.children.length) || (item.docs && item.docs.length)" :key="item.id" :index="''+item.id">
                        <template slot="title"><i class="el-icon-message"></i>{{ item.name }}</template>
                        <el-menu-item v-for="doc in item.docs" v-if="item.docs && item.docs.length" :key="'doc_' + doc.id" :index="'doc_'+doc.id" @click="loadDoc(doc.id)">
                            <i class="el-icon-document"></i>{{ doc.title }}
                        </el-menu-item>
                        <el-menu-item v-for="single in item.children" :key="single.id" :index="''+single.id" @click="loadDocs(single.id)">
                            <i class="el-icon-message"></i>{{ single.name }}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :key="item.id" :index="''+item.id" @click="loadDocs(item.id)">
                        <i class="el-icon-message"></i>{{ item.name }}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="child.id" :index="''+child.id" @click="loadDocs(child.id)">
                    <i class="el-icon-message"></i>{{ child.name }}
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="sidebar.id" :index="''+sidebar.id" @click="loadDocs(sidebar.id)">
                <i class="el-icon-message"></i>{{ sidebar.name }}
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
                openeds: [],
                input: ''
            }
        },
        methods: {
            loadDoc(doc_id) {
                this.$emit('loadDoc', doc_id);
            },
            loadDocs(cat_id) {
                this.$emit('loadDocs', cat_id);
            },
            loadCats() {
                this.$emit('loadCats', '', this.input);
                this.input = '';
            },
            handleLoad(key, keyPath) {
                this.loadDocs(key);
            },
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
    .el-menu {
        border-right: none;
    }
    .new-bar {
        margin-left: 190px;
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 5px;
    }
    .new-bar i {
        cursor: pointer;
        margin-right: 15px;
    }
</style>
