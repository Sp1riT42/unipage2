import Vue from 'vue'
import Vuex from 'vuex'
import trainingModule from '@/store/trainingModule'

Vue.use(Vuex)

export default new Vuex.Store( {
    modules: {
    trainingModule
    }
})