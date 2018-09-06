<template>
    <el-main>
        <h1 class="title">{{detail.title}}</h1>

        <el-form :inline="true" label-position="left">
            <el-row>
                <el-form-item label="接口地址：" v-if="detail.type == 1">
                    <code>{{ detail.url }}</code>
                </el-form-item>
                <el-form-item label="请求方式：" v-if="detail.type == 1">
                    {{ detail.method }}
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="开发状态：" v-if="detail.type == 1">
                    {{ detail.status }}
                </el-form-item>
                <el-form-item label="序号：">
                    {{ detail.sort }}
                </el-form-item>
                <el-form-item label="版本：">
                    {{ detail.version }}
                </el-form-item>
            </el-row>

            <el-tabs v-model="detail.activeName" class="parameters_field" v-if="detail.type == 1 && (detail.parameters.length || detail.headers.length)">
                <el-tab-pane label="请求参数（Query）" v-if="detail.parameters.length" name="parameters">

                    <el-table
                        :data="detail.parameters"
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
                <el-tab-pane label="头部（Headers）" v-if="detail.headers.length" name="headers">

                    <el-table
                        :data="detail.headers"
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
            v-model="detail.content"
            :subfield="false"
            :editable="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :ishljs="true"
            :navigation="true"
        />

        <el-button type="primary" class="reback" onclick="history.go(-1)">返回</el-button>
    </el-main>
</template>

<script>
    export default {
        name: 'DocListDetail',
        props: {
            detail: {
                type: Object|Array,
                required: true
            }
        },
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
        }
    }
</script>

<style scoped>
    .reback {
        margin-top: 15px;
        float: right;
    }
</style>
