import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import plan from './modules/plan'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    plan
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters:{
    
  }
})
