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
    }
}

export default new Vuex.Store({
    state,
    mutations
})
