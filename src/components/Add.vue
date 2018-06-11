<template>

    <el-main>
        <h1>新增编辑文档</h1>

        <mavon-editor
            v-model="value"
            :subfield="true"
            :editable="true"
            :toolbarsFlag="true"
            :ishljs="true"
            :navigation="false"
            @save="save()"
        />

        <router-link :to="{name:'Detail'}">
            <el-button type="primary">返回</el-button>
        </router-link>
    </el-main>

</template>

<script scope>
    export default {
        name: 'Add',
        data () {
            return {
                value: '# This is a title'
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
            }
        }
    }
</script>
