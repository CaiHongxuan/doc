<template>

    <el-main>
        <h1 class="title">项目列表</h1>

        <el-row>
            <el-col :span="20" :offset="2">
                <el-row>
                    <el-button type="primary" class="add-project" plain @click="dialogFormVisible = true">新增项目</el-button>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="4" v-for="item in projects" :key="item.id" class="card">
                        <router-link :to="item.link">
                            <el-card shadow="always">
                                <img :src="item.icon" class="image">
                                <div>
                                    <h4 class="title">{{ item.name }}</h4>
                                    <span>{{ item.desc }}</span>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
                projects: [
                    {
                        id: 1,
                        name: "项目1",
                        desc: "简介1啥地方是否斯蒂芬斯蒂芬是多少斯蒂芬斯蒂芬",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/doclist'
                    },
                    {
                        id: 2,
                        name: "项目2",
                        desc: "简介2威尔士范德萨的发生的发生松岛枫松岛枫",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/doclist'
                    },
                    {
                        id: 3,
                        name: "项目3",
                        desc: "简介3松岛枫松岛枫微服务打发斯蒂芬",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/doclist'
                    },
                    {
                        id: 4,
                        name: "项目4",
                        desc: "简介4盛世嫡妃方位服务发斯蒂芬斯蒂芬速度发斯蒂芬斯蒂芬的",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/doclist'
                    },
                    {
                        id: 5,
                        name: "项目5",
                        desc: "简介5额外热温柔温柔温柔温柔是法国的法国大 个方法是否收到",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/doclist'
                    },
                    {
                        id: 6,
                        name: "项目6",
                        desc: "简介6尾而对方告诉对方广东分公司的风格的风格的风格的风格 该责任",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/Detail'
                    },
                ],
                dialogFormVisible: false,
                form: {
                    name: '',
                    desc: ''
                },
                formLabelWidth: '100px',
                dialogWidth: '500px'
            }
        },
        mounted () {
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
        float: right;
        margin-bottom: 15px;
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
