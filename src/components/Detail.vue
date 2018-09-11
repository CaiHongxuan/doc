<template>

    <el-container>
        <el-main>
            <h1 class="title">{{title}}</h1>

            <el-form :inline="true" label-position="left">
                <el-row v-if="type == 1">
                    <el-form-item label="接口地址：">
                        <code>{{ url }}</code>
                    </el-form-item>
                    <el-form-item label="请求方式：">
                        {{ method }}
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="开发状态：" v-if="type == 1">
                        {{ status }}
                    </el-form-item>
                    <el-form-item label="序号：">
                        {{ sort }}
                    </el-form-item>
                    <el-form-item label="版本：">
                        {{ version }}
                    </el-form-item>
                </el-row>

                <el-tabs v-model="activeName" class="parameters_field" v-if="type == 1 && (parameters.length || headers.length)">
                    <el-tab-pane label="请求参数（Query）" v-if="parameters.length" name="parameters">

                        <el-table
                            :data="parameters"
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="参数名称"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="is_must_plan"
                                label="是否必填"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="type_plan"
                                label="参数类型">
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注">
                            </el-table-column>
                        </el-table>

                    </el-tab-pane>
                    <el-tab-pane label="头部（Headers）" v-if="headers.length" name="headers">

                        <el-table
                            :data="headers"
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="参数名称"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="is_must_plan"
                                label="是否必填"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="type_plan"
                                label="参数类型">
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注">
                            </el-table-column>
                        </el-table>

                    </el-tab-pane>
                </el-tabs>
            </el-form>

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

    export default {
        name: 'Detail',
        data () {
            return {
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
            }
        },
        methods: {
            load(id) {
                let that = this;
                that.$axios.get('/docs/' + id, {}).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        that.type = response.data.data.type;
                        that.title = response.data.data.title;
                        that.content = response.data.data.content;
                        that.url = response.data.data.url;
                        that.status = response.data.data.status_plan;
                        that.method = response.data.data.method_plan;
                        that.version = response.data.data.version;
                        that.sort = response.data.data.sort;
                        that.created_by = response.data.data.created_by.name;
                        that.updated_at = response.data.data.updated_at;
                        that.parameters = response.data.data.arguments['parameters'];
                        that.headers = response.data.data.arguments['headers'];
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
        },
        watch: {
            '$route' (to, from) {
                this.load(to.params.id);
            }
        }
    }
</script>

<style scoped>
    .reback {
        margin-top: 15px;
        float: right;
    }
</style>
