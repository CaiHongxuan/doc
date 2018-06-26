<template>

    <el-main>
        <h1>文档详情</h1>

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
            <el-button type="primary" class="reback">返回</el-button>
        </router-link>
    </el-main>

</template>

<script>
    export default {
        name: 'Detail',
        data () {
            return {
                value: "# Article title"
            }
        }
    }
</script>

<style>
    h1 {
        text-align: center;
    }
    .reback {
        margin-top: 15px;
        float: right;
    }
</style>
