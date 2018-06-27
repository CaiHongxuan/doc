import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    isShowNavBar: true,
    isShowSideBar: true
}

const mutations = {
    hideNavBar (state) {
        state.isShowNavBar = false
    },
    hideSideBar (state) {
        state.isShowSideBar = false
    },
    showNavBar (state) {
        state.isShowNavBar = true
    },
    showSideBar (state) {
        state.isShowSideBar = true
    }
}

export default new Vuex.Store({
    state,
    mutations
})
