<template>
    <el-row>
        <el-col :span="6">
            <el-form-item label="参数名称">
                <el-input v-model="parameter.name" size="small"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="3">
            <el-form-item label="是否必填">
                <el-switch v-model="parameter.is_must"></el-switch>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="类型">
                <el-select v-model="parameter.type" size="small">
                    <el-option label="string" value="0"></el-option>
                    <el-option label="int" value="1"></el-option>
                    <el-option label="number" value="2"></el-option>
                    <el-option label="array" value="3"></el-option>
                    <el-option label="json" value="4"></el-option>
                    <el-option label="any" value="5"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="备注">
                <el-input v-model="parameter.remark" size="small"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="1">
            <el-form-item>
                <i class="el-icon-error remove" @click="removeItem"></i>
            </el-form-item>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'Parameters',
        props: {
            parameter: {
                type: Object|Array,
                required: true
            }
        },
        data () {
            return {}
        },
        methods: {
            // 删除一个条目
            removeItem() {
                // 触发父级事件
                this.$emit('changeItem');
            }
        }
    }
</script>

<style>
    .remove {
        cursor: pointer;
    }
</style>
