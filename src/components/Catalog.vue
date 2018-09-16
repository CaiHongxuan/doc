<template>

    <el-card class="box-card center-card">
        <el-button type="text" @click="addCat">添加目录</el-button>
        <el-button type="text" onclick="history.go(-1)">返回</el-button>
        <div class="text item">
            <el-table
                :data="catalogs"
                :row-class-name="tableRowClassName"
                height="400"
                border
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="目录名"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="created_at"
                    label="添加时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="sort"
                    label="序号"
                    width="80">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="editCat(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="delCat(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>

</template>

<script>
    export default {
        name: 'Catalog',
        data() {
            return {
                project_id: '',
                catalogs: [],
                addCatalogs: [],
            }
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            // 加载目录
            loadCats (projectId) {
                let that = this;
                projectId = projectId ? projectId : that.project_id;
                that.$axios.get('/catalogs', {pro_id:projectId}).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        // todo 循环读取
                        that.catalogs = response.data.data;
                        // 采用JSON.parse与JSON.stringify防止浅拷贝
                        that.addCatalogs = JSON.parse(JSON.stringify(response.data.data));
                        that.addCatalogs.unshift({id: 0, name:"顶级目录"});
                    } else if (response.status === -404) {
                        that.$message.error(response.msg);
                    } else {
                        that.$message.error(response.data.msg);
                    }
                }).catch(function(response){
                    console.log(response); // 发生异常错误时执行的代码
                });
            },
            // 新增目录
            addCat () {
                let that = this;
                let data = {
                    name: that.dialogform.name,
                    parent_ids: that.dialogform.parents,
                    sort: that.dialogform.sort,
                    pro_id: that.$route.params.id
                };
                that.$axios.post('/catalogs', data).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        that.$message.success('新建成功');
                        that.loadCats(that.$route.params.id);
                    } else if (response.status === -404) {
                        that.$message.error(response.msg);
                    } else {
                        that.$message.error(response.data.msg);
                    }
                }).catch(function(response){
                    console.log(response); // 发生异常错误时执行的代码
                });
                this.dialogform.dialogFormVisible = false;
            }
        },
        mounted () {
            this.project_id = this.$route.params.id;
            this.loadCats(this.project_id);
        }
    }
</script>

<style>
    .center-card {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        padding: 0 15px;
        box-sizing: border-box;
        text-align: left;
        width: 600px;
        height: 500px;
    }
    .el-table .warning-row {
        background-color: oldlace;
    }
    .el-table .success-row {
        background-color: #f0f9eb;
    }
</style>
