<template>

    <el-main>
        你好 {{ msg }}
    </el-main>

</template>

<script>
    import store from '../store/store'

    export default {
        name: 'Index',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted () {
            store.commit('hideSideBar');
        }
    }
</script>
