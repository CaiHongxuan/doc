<template>

    <el-main>
        <h1 class="title">项目列表</h1>

        <el-row>
            <el-col :span="20" :offset="2">
                <el-row :gutter="16">
                    <el-col :span="11" :offset="6">
                        <el-input v-model="query" placeholder="请输入内容按回车搜索" class="input-with-select" size="small" @keyup.enter.native="load">
                            <el-button slot="append" icon="el-icon-search" @click="load">搜索文档</el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="7">
                        <el-button type="primary" size="small" class="add-project" plain @click="dialogFormVisible = true">新增项目</el-button>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="4" v-for="item in projects" :key="item.id" class="card">
                        <router-link :to="{path:'/doclist/' + item.id}">
                            <el-card shadow="always">
                                <img :src="'/static/img/bg-' + (item.id % 2 + 1) + '.gif'" class="image">
                                <div>
                                    <h4 class="title">{{ item.name }}</h4>
                                    <span class="desc">{{ item.desc }}</span>
                                    <div class="bottom clearfix">
                                        <time class="time">{{ item.created_at }}</time>
                                    </div>
                                </div>
                            </el-card>
                        </router-link>
                    </el-col>
                </el-row>
                <!-- <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination> -->
            </el-col>
        </el-row>

        <el-dialog title="新增项目" :visible.sync="dialogFormVisible" :width="dialogWidth">
            <el-form :model="form">
                <el-form-item label="项目名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目简介" :label-width="formLabelWidth">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" v-model="form.desc" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="序号" :label-width="formLabelWidth">
                    <el-input v-model="form.sort" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addProject">确 定</el-button>
            </div>
        </el-dialog>

    </el-main>

</template>

<script>
    import store from '../store/store'

    export default {
        name: 'Index',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                projects: [],
                query: '',
                dialogFormVisible: false,
                form: {
                    name: '',
                    desc: '',
                    sort: 99
                },
                formLabelWidth: '100px',
                dialogWidth: '500px'
            }
        },
        methods: {
            // 加载项目列表
            load() {
                let that = this;
                that.$axios.get('/projects', {q: that.query}).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        that.projects = response.data.data.data;
                    } else if (response.status === -404) {
                        that.$message.error(response.msg);
                    } else {
                        that.$message.error(response.data.msg);
                    }
                }).catch(function(response){
                    console.log(response); // 发生异常错误时执行的代码
                });
            },
            // 新增项目
            addProject() {
                let that = this;
                that.$axios.post('/projects', that.form).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        that.$message.success('新建成功');
                        that.projects.push(response.data.data);
                    } else if (response.status === -404) {
                        that.$message.error(response.msg);
                    } else {
                        that.$message.error(response.data.msg);
                    }
                }).catch(function(response){
                    console.log(response); // 发生异常错误时执行的代码
                });
                this.dialogFormVisible = false;
            }
        },
        mounted () {
            this.load();
            store.commit('hideSideBar');
        }
    }
</script>

<style scoped>
    a {
        color: #000;
        text-decoration: none;
        display: block;
        text-align: left;
    }
    .add-project {
        margin: 0px 0px 15px 15px;
    }
    .desc {
        font-size: 14px;
    }
    .time {
        font-size: 13px;
        color: #999;
        float: left;
    }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
    .image {
        width: 100%;
        max-height: 180px;
        display: block;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .card {
        margin-bottom: 15px;
    }
</style>
