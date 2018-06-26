<template>

    <el-main>
        你好 {{ msg }}

        <el-row :gutter="16">
            <el-col :span="4" v-for="item in projects" :key="key">
                <router-link :to="item.link">
                    <el-card shadow="always">
                        <img src="/static/favicon.ico" class="image">
                        <div>
                            <h4>{{ item.name }}</h4>
                            <span>{{ item.desc }}</span>
                            <div class="bottom clearfix">
                                <time class="time">{{ item.created_at }}</time>
                            </div>
                        </div>
                    </el-card>
                </router-link>
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
                        desc: "简介1啥地方是否斯蒂芬斯蒂芬是多少斯蒂芬斯蒂芬",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/Detail'
                    },
                    {
                        id: 2,
                        name: "项目2",
                        desc: "简介2威尔士范德萨的发生的发生松岛枫松岛枫",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/Detail'
                    },
                    {
                        id: 3,
                        name: "项目3",
                        desc: "简介3松岛枫松岛枫微服务打发斯蒂芬",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/Detail'
                    },
                    {
                        id: 4,
                        name: "项目4",
                        desc: "简介4盛世嫡妃方位服务发斯蒂芬斯蒂芬速度发斯蒂芬斯蒂芬的",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/Detail'
                    },
                    {
                        id: 5,
                        name: "项目5",
                        desc: "简介5额外热温柔温柔温柔温柔是法国的法国大 个方法是否收到",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/Detail'
                    },
                    {
                        id: 6,
                        name: "项目6",
                        desc: "简介6尾而对方告诉对方广东分公司的风格的风格的风格的风格 该责任",
                        created_at: "2018-06-20 21:32:04",
                        icon: "/static/favicon.ico",
                        link: '/Detail'
                    },
                ]
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
h4 {
    text-align: center;
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
</style>
