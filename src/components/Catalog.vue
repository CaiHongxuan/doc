<template>

    <el-container>
        <el-card class="box-card center-card">
            <el-button type="text" @click="dialogform.dialogFormVisible = dialogform.method = true">添加目录</el-button>
            <el-button type="text" onclick="history.go(-1)">返回</el-button>
            <div class="text item">
                <el-table
                    :data="catalogs"
                    :row-class-name="tableRowClassName"
                    height="400"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="newname"
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
                        width="60">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="showEditCat(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="delCat(scope.row.id)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-dialog :title="dialogform.method ? '新增目录' : '编辑目录'" :visible.sync="dialogform.dialogFormVisible" :width="dialogform.dialogWidth">
            <el-form :model="dialogform">
                <el-form-item label="上级目录" :label-width="dialogform.formLabelWidth">
                    <el-cascader
                        :options="dialogform.options"
                        v-model="dialogform.parents"
                        :props="dialogform.props"
                        filterable
                        change-on-select>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="目录名称" :label-width="dialogform.formLabelWidth">
                    <el-input v-model="dialogform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="序号" :label-width="dialogform.formLabelWidth">
                    <el-input v-model="dialogform.sort" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogform.dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogform.method ? addCat : editCat(dialogform.id)">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>

</template>

<script>
    export default {
        name: 'Catalog',
        data() {
            return {
                project_id: '',
                catalogs: [],
                showDelTip: false,
                dialogform: {
                    method: true, // true 新增目录；false 编辑目录
                    id: '',
                    name: '',
                    parents: [],
                    sort: 99,
                    props: {
                        value: 'id',
                        label: 'name'
                    },
                    options: [],
                    dialogFormVisible: false,
                    formLabelWidth: '100px',
                    dialogWidth: '500px'
                },
            }
        },
        methods: {
            // 给顶级目录增加背景色
            tableRowClassName({row, rowIndex}) {
                if (row.parent_id == 0) {
                    return 'success-row';
                }
                return '';
            },
            // 递归处理目录（树形目录转化成一级目录）
            recurCat(Cats, level = 0) {
                for (var i = 0; i < Cats.length; i++) {
                    Cats[i].newname = level ? (Array(level+1).join('--') + ' ' + Cats[i].name) : Cats[i].name;
                    this.catalogs.push(Cats[i]);
                    if (Cats[i].children && Cats[i].children.length) {
                        this.recurCat(Cats[i].children, level + 1);
                    }
                }
            },
            // 加载目录
            loadCats (projectId) {
                let that = this;
                projectId = projectId ? projectId : that.project_id;
                that.$axios.get('/catalogs', {pro_id:projectId}).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        let data = response.data.data;
                        that.catalogs = [];
                        // 采用JSON.parse与JSON.stringify防止浅拷贝
                        that.dialogform.options = JSON.parse(JSON.stringify(data));
                        that.dialogform.options.unshift({id: "0", name:"顶级目录"});
                        that.recurCat(data);
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
            },
            // 显示编辑目录
            showEditCat(Cat) {
                this.dialogform.method = false;
                this.dialogform.id = Cat.id;
                this.dialogform.name = Cat.name;
                this.dialogform.parents = Cat.parent_ids.split(',');
                this.dialogform.sort = Cat.sort;
                this.dialogform.dialogFormVisible = true;
            },
            // 更新目录
            editCat(CatId) {
                let that = this;
                let data = {
                    name: that.dialogform.name,
                    parent_ids: that.dialogform.parents,
                    sort: that.dialogform.sort,
                    pro_id: that.$route.params.id
                };
                that.$axios.put('/catalogs/' + CatId, data).then(function(response){
                    if (response.status == 200 && response.data.code == 0) {
                        that.$message.success('更新成功');
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
            },
            // 删除目录
            delCat (CatId) {
                let that = this;
                that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$axios.delete('/catalogs/' + CatId).then(function(response){
                        if (response.status == 200 && response.data.code == 0) {
                            that.$message.success('删除成功');
                            that.loadCats(that.$route.params.id);
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
