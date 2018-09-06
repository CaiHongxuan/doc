<template>

    <el-container>

        <SideBar v-show="this.$store.state.isShowSideBar" :sidebars="sidebars" @loadDoc="loadDoc" @loadDocs="setCatAndLoadDocs"></SideBar>

        <el-main v-show="showList">
            <h1 class="title">文档列表</h1>
            <el-row :gutter="16">
                <el-col :span="12">
                    <el-input placeholder="请输入内容" class="input-with-select" size="small">
                        <el-button slot="append" icon="el-icon-search">搜索文档</el-button>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-button size="small" @click="dialogform.dialogFormVisible = true">新增目录</el-button>
                    <router-link :to="{path:'/add', query:{type:2, pro_id:$route.params.id}}">
                        <el-button size="small">新增普通文档</el-button>
                    </router-link>
                    <router-link :to="{path:'/add', query:{type:1, pro_id:$route.params.id}}">
                        <el-button size="small">新增接口文档</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row class="table-field">
                <el-table
                    :data="tableData.content"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="title"
                        label="接口名称"
                        fixed="left"
                        min-width="500">
                    </el-table-column>
                    <el-table-column
                        prop="updated_by.name"
                        label="最后更新者"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="updated_at"
                        label="更新时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                            <router-link :to="{path:'/detail/' + scope.row.id}">
                                <el-button size="small" plain>查看</el-button>
                            </router-link>
                            <router-link :to="{path:'/add/' + scope.row.id, query:{pro_id:$route.params.id}}">
                                <el-button size="small" plain>编辑</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="loadDocs"
                    class="pagination-field"
                    :page-size="tableData.per_size"
                    :total="tableData.total">
                </el-pagination>
            </el-row>


            <el-dialog title="新增目录" :visible.sync="dialogform.dialogFormVisible" :width="dialogform.dialogWidth">
                <el-form :model="dialogform">
                    <el-form-item label="上级目录" :label-width="dialogform.formLabelWidth">
                        <el-cascader
                            :options="dialogform.options"
                            v-model="dialogform.parents"
                            :props="dialogform.props"
                            filterable
                            change-on-select>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="目录名称" :label-width="dialogform.formLabelWidth">
                        <el-input v-model="dialogform.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="序号" :label-width="dialogform.formLabelWidth">
                        <el-input v-model="dialogform.sort" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogform.dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addCat">确 定</el-button>
                </div>
            </el-dialog>
        </el-main>

        <DocListDetail v-show="!showList" :detail="detail"></DocListDetail>

    </el-container>

</template>

<script>
    import store from '../store/store'
    import SideBar from './SideBar.vue'
    import DocListDetail from './DocListDetail.vue'

    export default {
        name: 'DocList',
        components: {
            SideBar,
            DocListDetail
        },
        data () {
            return {
                cat_id: 0,
                sidebars: [],
                showList: true,
                content: '',
                detail: {
                    type: "",
                    title: "",
                    content: "",
                    url: "",
                    status: "",
                    method: "",
                    version: "",
                    sort: "",
                    created_by: "",
                    updated_at: "",
                    activeName: 'parameters',
                    parameters: [],
                    headers: [],
                },
                tableData: {
                    total: 0,
                    per_size: 15,
                    content: []
                },
                dialogform: {
                    name: '',
                    parents: [],
                    sort: 99,
                    props: {
                        value: 'id',
                        label: 'name'
                    },
                    options: [],
                    dialogFormVisible: false,
                    formLabelWidth: '100px',
                    dialogWidth: '500px'
                },
            }
        },
        methods: {
            // 加载侧边栏目录
            loadCats (projectId) {
                let that = this;
                that.$axios.get('/catalogs', {pro_id:projectId, docs:true}).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        that.sidebars = response.data.data;
                        // 采用JSON.parse与JSON.stringify防止浅拷贝
                        that.dialogform.options = JSON.parse(JSON.stringify(response.data.data.cats));
                        that.dialogform.options.unshift({id: 0, name:"顶级目录"});
                    } else if (response.status === -404) {
                        that.$message.error(response.msg);
                    } else {
                        that.$message.error(response.data.msg);
                    }
                }).catch(function(response){
                    console.log(response); // 发生异常错误时执行的代码
                });
            },
            // 加载文档详情
            loadDoc (doc_id) {
                let that = this;
                that.showList = false;
                that.$axios.get('/docs/' + doc_id, {}).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        that.detail.content = response.data.data.content;
                        that.detail.type = response.data.data.type;
                        that.detail.title = response.data.data.title;
                        that.detail.content = response.data.data.content;
                        that.detail.url = response.data.data.url;
                        that.detail.status = response.data.data.status_plan;
                        that.detail.method = response.data.data.method_plan;
                        that.detail.version = response.data.data.version;
                        that.detail.sort = response.data.data.sort;
                        that.detail.created_by = response.data.data.created_by.name;
                        that.detail.updated_at = response.data.data.updated_at;
                        that.detail.parameters = response.data.data.arguments['parameters'];
                        that.detail.headers = response.data.data.arguments['headers'];
                    } else if (response.status === -404) {
                        that.$message.error(response.msg);
                    } else {
                        that.$message.error(response.data.msg);
                    }
                }).catch(function(response){
                    console.log(response); // 发生异常错误时执行的代码
                });
            },
            // 加载文档列表
            loadDocs (page) {
                let that = this;
                that.showList = true;
                that.$axios.get('/docs', {cat_id:that.cat_id, page:page}).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        that.tableData.content = response.data.data.data;
                        that.tableData.total = response.data.data.total;
                        that.tableData.per_size = response.data.data.per_page;
                    } else if (response.status === -404) {
                        that.$message.error(response.msg);
                    } else {
                        that.$message.error(response.data.msg);
                    }
                }).catch(function(response){
                    console.log(response); // 发生异常错误时执行的代码
                });
            },
            // 设置目录id并加载文档列表
            setCatAndLoadDocs (cat_id) {
                this.cat_id = cat_id;
                // 将cat_id暂存，以便下次直接加载该文档列表
                sessionStorage.setItem('cat_id', cat_id);
                this.loadDocs(1);
            },
            // 新增目录
            addCat () {
                let that = this;
                let data = {
                    name: that.dialogform.name,
                    parent_ids: that.dialogform.parents,
                    sort: that.dialogform.sort,
                    pro_id: that.$route.params.id
                };
                that.$axios.post('/catalogs', data).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        that.$message.success('新建成功');
                        that.loadCats(that.$route.params.id);
                    } else if (response.status === -404) {
                        that.$message.error(response.msg);
                    } else {
                        that.$message.error(response.data.msg);
                    }
                }).catch(function(response){
                    console.log(response); // 发生异常错误时执行的代码
                });
                this.dialogform.dialogFormVisible = false;
            }
        },
        mounted () {
            this.loadCats(this.$route.params.id);
            this.setCatAndLoadDocs(sessionStorage.getItem('cat_id'));
            store.commit('showSideBar');
        }
    }
</script>

<style scoped>
    .table-field {
        margin: 15px 0px;
    }
    .pagination-field {
        text-align: center;
    }
</style>
