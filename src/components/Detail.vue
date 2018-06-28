<template>

    <el-container>
        <el-main>
            <h1 class="title">文档详情</h1>

            <mavon-editor
                v-model="content"
                :subfield="false"
                :editable="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                :ishljs="true"
                :navigation="true"
            />

            <el-button type="primary" class="reback" onclick="history.go(-1)">返回</el-button>
        </el-main>
    </el-container>

</template>

<script>
    import store from '../store/store'

    export default {
        name: 'Detail',
        data () {
            return {
                content: "",
            }
        },
        methods: {
            load(id) {
                let that = this;
                that.$axios.get('/docs/' + id, {}).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        that.content = response.data.data.content;
                    } else if (response.status === -404) {
                        that.$message.error(response.msg);
                    } else {
                        that.$message.error(response.data.msg);
                    }
                }).catch(function(response){
                    console.log(response); // 发生异常错误时执行的代码
                });
            }
        },
        mounted() {
            this.load(this.$route.params.id);
            store.commit('showSideBar');
        },
        watch: {
            '$route' (to, from) {
                this.load(to.params.id);
            }
        }
    }
</script>

<style>
    .reback {
        margin-top: 15px;
        float: right;
    }
</style>
