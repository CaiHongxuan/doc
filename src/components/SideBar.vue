<template>

    <el-aside>
        <el-menu :default-openeds="openeds" @open="handleLoad">
            <el-input v-model="input" placeholder="输入关键字后按回车以搜索" @keyup.enter.native="loadCats"></el-input>
            <div class="new-bar">
                <el-tooltip class="item" effect="dark" content="新建页面" placement="left">
                    <i class="el-icon-document" @click="addPage"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="新建目录" placement="right">
                    <img class="icon-folder add" src="/static/img/folder.png" @click="showAddCat">
                </el-tooltip>
            </div>
            <el-menu-item v-for="doc in sidebars.docs" v-if="sidebars.docs && sidebars.docs.length" :key="'doc_' + doc.id" :index="'doc_'+doc.id" @click="loadDoc(doc.id)">
                <i class="el-icon-document"></i>{{ doc.title }}
            </el-menu-item>
            <el-submenu v-for="sidebar in sidebars.cats" v-if="(sidebar.children && sidebar.children.length) || (sidebar.docs && sidebar.docs.length)" :key="sidebar.id" :index="''+sidebar.id">
                <template slot="title"><img class="icon-folder-min" src="/static/img/folder-min.png">{{ sidebar.name }}</template>
                <el-menu-item v-for="doc in sidebar.docs" v-if="sidebar.docs && sidebar.docs.length" :key="'doc_' + doc.id" :index="'doc_'+doc.id" @click="loadDoc(doc.id)">
                    <i class="el-icon-document"></i>{{ doc.title }}
                </el-menu-item>
                <el-submenu v-for="child in sidebar.children" v-if="(child.children && child.children.length) || (child.docs && child.docs.length)" :key="child.id" :index="''+child.id">
                    <template slot="title"><img class="icon-folder-min" src="/static/img/folder-min.png">{{ child.name }}</template>
                    <el-menu-item v-for="doc in child.docs" v-if="child.docs && child.docs.length" :key="'doc_' + doc.id" :index="'doc_'+doc.id" @click="loadDoc(doc.id)">
                        <i class="el-icon-document"></i>{{ doc.title }}
                    </el-menu-item>
                    <el-submenu v-for="item in child.children" v-if="(item.children && item.children.length) || (item.docs && item.docs.length)" :key="item.id" :index="''+item.id">
                        <template slot="title"><img class="icon-folder-min" src="/static/img/folder-min.png">{{ item.name }}</template>
                        <el-menu-item v-for="doc in item.docs" v-if="item.docs && item.docs.length" :key="'doc_' + doc.id" :index="'doc_'+doc.id" @click="loadDoc(doc.id)">
                            <i class="el-icon-document"></i>{{ doc.title }}
                        </el-menu-item>
                        <el-menu-item v-for="single in item.children" :key="single.id" :index="''+single.id" @click="loadDocs(single.id)">
                            <img class="icon-folder-min" src="/static/img/folder-min.png">{{ single.name }}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :key="item.id" :index="''+item.id" @click="loadDocs(item.id)">
                        <img class="icon-folder-min" src="/static/img/folder-min.png">{{ item.name }}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="child.id" :index="''+child.id" @click="loadDocs(child.id)">
                    <img class="icon-folder-min" src="/static/img/folder-min.png">{{ child.name }}
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="sidebar.id" :index="''+sidebar.id" @click="loadDocs(sidebar.id)">
                <img class="icon-folder-min" src="/static/img/folder-min.png">{{ sidebar.name }}
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
            addPage() {
                this.$router.push({path:'/add', query:{type:'1', pro_id:this.$route.params.id}});
            },
            showAddCat() {
                this.$router.push({path:'/catalog/' + this.$route.params.id});
                // this.$emit('showAddCat');
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
    .new-bar i, .new-bar .add {
        cursor: pointer;
        margin-right: 15px;
    }
    .icon-folder {
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
    .icon-folder-min {
        margin: 0 8px 0 5px;
        width: 18px;
        height: 20px;
        vertical-align: middle;
    }
</style>
