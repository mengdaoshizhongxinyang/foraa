import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import {getPlan} from '@/api/show/plan'
const user = {
  state: {
    plan:[]
  },

  mutations: {
    SET_PLAN:(state,plan)=>{
      state.plan=plan
    }
  },

  actions: {
    // 登录
    getPlan ({ commit }, id) {
      return new Promise((resolve, reject) => {
        getPlan(id).then(response => {
          const result = response
          if(result.errcode===0){
            commit('SET_PLAN', result.result)
            resolve()
          }else{
            let err={
              message:result.msg
            }
            throw err
          }
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default user
