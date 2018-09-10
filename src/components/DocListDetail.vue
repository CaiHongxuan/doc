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

        <div class="page-bar">
            <ul>
                <li>
                    <el-tooltip class="item" effect="dark" content="编辑页面" placement="left">
                        <router-link :to="{path:'/add/' + detail.id, query:{pro_id:detail.pro_id}}">
                            <el-button class="el-button--text" icon="el-icon-edit"></el-button>
                        </router-link>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="详情" placement="left">
                        <el-button class="el-button--text" icon="el-icon-info" @click="docInfo"></el-button>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="分享" placement="left">
                        <el-button class="el-button--text" icon="el-icon-share" @click="share"></el-button>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="删除此页面" placement="left">
                        <el-button class="el-button--text" icon="el-icon-delete" @click="del"></el-button>
                    </el-tooltip>
                </li>
            </ul>
        </div>
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
        },
        methods: {
            loadCats() {
                this.$emit('loadCats', this.detail.pro_id);
            },
            docInfo() {
                this.$alert('本页面由 ' + this.detail.updated_by + ' 于 ' + this.detail.updated_at + ' 更新', '', {
                    confirmButtonText: '确定',
                    center: true
                });
            },
            share() {
                this.$notify.warning({
                    title: '通知',
                    message: '分享功能暂未开通'
                });
            },
            del() {
                let that = this;
                that.$confirm('此操作将永久删除文件《' + that.detail.title + '》, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$axios.delete('/docs/' + that.detail.id, {}).then(function(response){
                        if (response.status == 200 && response.data.code == 0) {
                            that.loadCats();
                            that.$message.success('删除成功!');
                            location.reload();
                        } else if (response.status === -404) {
                            that.$message.error(response.msg);
                        } else {
                            that.$message.error(response.data.msg);
                        }
                    }).catch(function(response){
                        console.log(response); // 发生异常错误时执行的代码
                    });
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .reback {
        margin-top: 15px;
        float: right;
    }
    .page-bar {
        position: fixed;
        top: 120px;
        right: 10px;
        width: 100px;
    }
    .page-bar ul li {
        list-style: none;
    }
</style>
