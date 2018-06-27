<template>

    <el-main>
        <h1 class="title">文档详情</h1>
        <el-row :gutter="16">
            <el-col :span="12">
                <el-input placeholder="请输入内容" class="input-with-select" size="small">
                    <el-button slot="append" icon="el-icon-search">搜索文档</el-button>
                </el-input>
            </el-col>
            <el-col :span="12">
                <el-button size="small" @click="dialogform.dialogFormVisible = true">新增目录</el-button>
                <el-button size="small">新增普通文档</el-button>
                <el-button size="small">新增接口文档</el-button>
            </el-col>
        </el-row>
        <el-row class="table-field">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="接口名称"
                    fixed="left"
                    min-width="500">
                </el-table-column>
                <el-table-column
                    prop="updated_by"
                    label="最后更新者"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="created_at"
                    label="创建时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-button size="small" type="" plain>查看</el-button>
                        <el-button size="small" type="" plain>编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="loadData"
                class="pagination-field"
                :total="1000">
            </el-pagination>
        </el-row>


        <el-dialog title="新增目录" :visible.sync="dialogform.dialogFormVisible" :width="dialogform.dialogWidth">
            <el-form :model="dialogform">
                <el-form-item label="上级目录" :label-width="dialogform.formLabelWidth">
                    <el-cascader
                        :options="dialogform.options"
                        v-model="dialogform.parents"
                        filterable
                        change-on-select>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="目录名称" :label-width="dialogform.formLabelWidth">
                    <el-input v-model="dialogform.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogform.dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogform.dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-main>

</template>

<script>
    export default {
        name: 'DocList',
        data () {
            return {
                tableData: [{
                    name: '上海市普陀区金沙江路 1518 弄',
                    created_at: '2016-05-02',
                    updated_by: '王小虎'
                }, {
                    name: '上海市普陀区金沙江路 1518 弄',
                    created_at: '2016-05-04',
                    updated_by: '王小虎'
                }, {
                    name: '上海市普陀区金沙江路 1518 弄',
                    created_at: '2016-05-01',
                    updated_by: '王小虎'
                }, {
                    name: '上海市普陀区金沙江路 1516 弄',
                    created_at: '2016-05-03',
                    updated_by: '王小虎',
                }],
                dialogform: {
                    name: '',
                    parents: [],
                    options: [{
                        value: 'zhinan',
                        label: '指南',
                        children: [{
                            value: 'shejiyuanze',
                            label: '设计原则',
                            children: [{
                                value: 'yizhi',
                                label: '一致'
                            }, {
                                value: 'fankui',
                                label: '反馈'
                            }, {
                                value: 'xiaolv',
                                label: '效率'
                            }, {
                                value: 'kekong',
                                label: '可控'
                            }]
                        }, {
                            value: 'daohang',
                            label: '导航',
                            children: [{
                                value: 'cexiangdaohang',
                                label: '侧向导航'
                            }, {
                                value: 'dingbudaohang',
                                label: '顶部导航'
                            }]
                        }]
                    }],
                    dialogFormVisible: false,
                    formLabelWidth: '100px',
                    dialogWidth: '500px'
                },
            }
        },
        methods: {
            loadData (page) {
                console.log(page);
            }
        }
    }
</script>

<style>
    .table-field {
        margin: 15px 0px;
    }
    .pagination-field {
        text-align: center;
    }
</style>
