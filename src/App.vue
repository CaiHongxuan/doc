<template>
    <div id="app">
        <el-container>
            <el-header v-show="this.$store.state.isShowNavBar">
                <NavBar></NavBar>
            </el-header>
            <!-- <el-container> -->
                <!-- <SideBar v-show="this.$store.state.isShowSideBar"></SideBar> -->
                <router-view/>
            <!-- </el-container> -->
        </el-container>
    </div>
</template>

<script>
    import NavBar from './components/NavBar.vue';
    import SideBar from './components/SideBar.vue';

    export default {
        name: 'App',
        components: {
            NavBar,
            SideBar
        }
    }
</script>

<style>
    body {
        margin: 0px;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        /*margin-top: 60px;*/
    }
    .title {
        text-align: center;
    }
    .el-header {
        position: fixed;
        top: 0px;
        width: 100%;
        z-index: 999;
    }
    .el-container {
        position: fixed;
        top: 60px;
        width: 100%;
        height: 100%;
        padding-bottom: 80px;
    }
</style>
