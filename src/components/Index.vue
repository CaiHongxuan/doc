<template>

    <el-main>
        你好 {{ msg }}

        <el-row :gutter="12">
            <el-col :span="3" v-for="item in projects">
                <el-card shadow="always">
                    <img src="/static/favicon.ico" class="image">
                    <div style="padding: 14px;">
                        <h4>{{ item.name }}</h4>
                        <span>{{ item.desc }}</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ item.created_at }}</time>
                            <el-button type="text" class="button">操作按钮</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

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
                        desc: "简介1",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico"
                    },
                    {
                        id: 2,
                        name: "项目2",
                        desc: "简介2",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico"
                    },
                    {
                        id: 3,
                        name: "项目3",
                        desc: "简介3",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico"
                    },
                    {
                        id: 4,
                        name: "项目4",
                        desc: "简介4",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico"
                    },
                    {
                        id: 5,
                        name: "项目5",
                        desc: "简介5",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico"
                    },
                    {
                        id: 6,
                        name: "项目6",
                        desc: "简介6",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico"
                    },
                ]
            }
        },
        mounted () {
            store.commit('hideSideBar');
        }
    }
</script>

<style>
.time {
    font-size: 13px;
    color: #999;
    float: left;
}
.bottom {
    margin-top: 13px;
    line-height: 12px;
}
.button {
    padding: 0;
    float: right;
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
</style>
