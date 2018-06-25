<template>

    <el-main>
        <h1>文档详情</h1>

        <el-form :inline="true" :rules="rules" ref="form" :model="form" label-width="80px">
            <el-form-item label="接口名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="接口地址" prop="url">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="请求方式" prop="method">
                <el-select v-model="form.method" placeholder="请选择请求方式">
                    <el-option label="Any" value="0" selected></el-option>
                    <el-option label="GET" value="1"></el-option>
                    <el-option label="POST" value="2"></el-option>
                    <el-option label="PUT" value="3"></el-option>
                    <el-option label="PATCH" value="4"></el-option>
                    <el-option label="DELETE" value="5"></el-option>
                    <el-option label="OPTIONS" value="6"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开发状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择开发状态">
                    <el-option label="开发中" value="0" selected></el-option>
                    <el-option label="已完成" value="1"></el-option>
                    <el-option label="已废弃" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="版本" prop="version">
                <el-input v-model="form.version"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>

            <!-- todo 参数及头部 -->

        </el-form>

        <mavon-editor
            v-model="value"
            :subfield="false"
            :editable="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :ishljs="true"
            :navigation="true"
        />

        <router-link :to="{name:'Index'}">
            <el-button type="primary">返回</el-button>
        </router-link>
    </el-main>

</template>

<script scope>
    export default {
        name: 'Detail',
        data () {
            return {
                value: "# Article title",
                form: {
                    name: '',
                    url: '',
                    method: '',
                    status: '',
                    version: 1,
                },
                rules: {
                    name: [
                        { required: true, message: '请输入接口名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请输入接口地址', trigger: 'blur' }
                    ],
                    method: [
                        { required: true, message: '请选择请求方式', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请选择开发状态', trigger: 'change' }
                    ],
                    version: [
                        { required: true, message: '请填写接口版本', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
