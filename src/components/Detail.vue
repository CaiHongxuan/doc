<template>

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

        <router-link :to="{name:'Index'}">
            <el-button type="primary" class="reback">返回</el-button>
        </router-link>
    </el-main>

</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Detail',
        data () {
            return {
                content: "# Article title"
            }
        },
        methods: {
            load(id) {
                let that = this;
                axios.get('http://www.apidoc.test/v1/docs/' + id, {}).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        that.content = response.data.data.content
                    } else {
                        that.$message.error(response.data.msg);
                    }
                }).catch(function(response){
                    console.log(response);//发生错误时执行的代码
                });
            }
        },
        mounted() {
            this.load(this.$route.params.id);
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
