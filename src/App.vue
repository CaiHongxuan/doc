<template>
    <div id="app">
        <el-container>
            <el-header>
                <NavBar></NavBar>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import NavBar from './components/NavBar.vue';

    export default {
        name: 'App',
        components: {
            NavBar
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
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
}
</style>
