<template>

    <el-main>
        <h1 class="title">新增/编辑文档</h1>

        <el-form :inline="true" label-position="left" :rules="rules" ref="form" :model="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="接口名称" prop="name">
                        <el-input v-model="form.name" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="接口地址" prop="url">
                        <el-input v-model="form.url" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="请求方式" prop="method">
                    <el-select v-model="form.method" placeholder="请选择请求方式"  size="small">
                        <el-option label="Any" value="0"></el-option>
                        <el-option label="GET" value="1"></el-option>
                        <el-option label="POST" value="2"></el-option>
                        <el-option label="PUT" value="3"></el-option>
                        <el-option label="PATCH" value="4"></el-option>
                        <el-option label="DELETE" value="5"></el-option>
                        <el-option label="OPTIONS" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开发状态" prop="status">
                    <el-select v-model="form.status" placeholder="请选择开发状态"  size="small">
                        <el-option label="开发中" value="0"></el-option>
                        <el-option label="已完成" value="1"></el-option>
                        <el-option label="已废弃" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本：">
                    {{ form.version }}
                </el-form-item>
            </el-row>

            <el-tabs v-model="activeName" class="parameters_field">
                <el-tab-pane label="请求参数（Query）" name="parameters">

                    <parameters v-for="(parameter, index) in form.parameters" :parameter="parameter" v-on:changeItem="removeParaItem(index)"></parameters>

                    <el-row>
                        <el-button size="small" @click="addParaItem()">添加参数</el-button>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="头部（Headers）" name="headers">

                    <parameters v-for="(header, index) in form.headers" :parameter="header" v-on:changeItem="removeHeaderItem(index)"></parameters>

                    <el-row>
                        <el-button size="small" @click="addHeaderItem()">添加参数</el-button>
                    </el-row>
                </el-tab-pane>
            </el-tabs>

            <mavon-editor
                v-model="value"
                :subfield="true"
                :editable="true"
                :toolbarsFlag="true"
                :ishljs="true"
                :navigation="false"
                @save="save()"
                class="mavon"
            />

            <el-form-item class="reback">
                <el-button type="primary" onclick="history.go(-1)">返回</el-button>
                <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>

        </el-form>

    </el-main>

</template>

<script scope>
    import parameters from './Parameters.vue';

    export default {
        name: 'Add',
        components: {
            parameters
        },
        data () {
            return {
                value: '# This is a title',
                activeName: 'parameters',
                form: {
                    name: '',
                    url: '',
                    method: '1',
                    status: '0',
                    version: 1,
                    parameters: [],
                    headers: []
                },
                // 验证规则
                rules: {
                    name: [
                        { required: true, message: '请输入接口名称', trigger: 'blur' },
                        { min: 3, message: '长度不小于 3 个字符', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请输入接口地址', trigger: 'blur' }
                    ],
                    method: [
                        { required: true, message: '请选择请求方式', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请选择开发状态', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            // 保存文件
            save() {
                var urlObject = window.URL || window.webkitURL || window;
                var downloadData = new Blob([this.value]);
                var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
                save_link.href = urlObject.createObjectURL(downloadData);
                console.log(save_link, save_link.href);
                save_link.download = "文档.md";
                var ev = document.createEvent("MouseEvents");
                ev.initMouseEvent(
                    "click", true, false, window, 0, 0, 0, 0, 0
                    , false, false, false, false, 0, null
                );
                save_link.dispatchEvent(ev);
            },
            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //
                        // todo 表单提交
                        //
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 添加一个请求参数
            addParaItem() {
                this.form.parameters.push({
                    name: '',
                    is_must: false,
                    type: '0',
                    remark: ''
                });
            },
            // 删除一个请求参数
            removeParaItem(index) {
                this.form.parameters.splice(index, 1);
            },
            // 添加一个Header参数
            addHeaderItem() {
                this.form.headers.push({
                    name: '',
                    is_must: false,
                    type: '0',
                    remark: ''
                });
            },
            // 删除一个Header参数
            removeHeaderItem(index) {
                this.form.headers.splice(index, 1);
            }
        }
    }
</script>

<style>
    .parameters_field {
        border: 1px solid #ebebeb;
        border-radius: 3px;
        transition: .2s;
        padding: 24px;
        margin-bottom: 15px;
    }
    .reback {
        margin-top: 15px;
        float: right;
    }
    .mavon {
        min-height: 600px;
    }
</style>
