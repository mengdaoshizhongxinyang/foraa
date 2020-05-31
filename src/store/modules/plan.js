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
    },
    ADD_PLAN:(state,plan)=>{
      state.plan.push(plan)
    },
    DEL_PLAN:(state,id)=>{
      for(let i=0;i<state.plan.length;i++){
        if(state.plan[i].id==id){
          state.plan.splice(i,1)
          break;
        }
      }
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
    },
    addPlan({commit},plan){
      commit('ADD_PLAN', plan)
    },
    delPlan({commit},id){
      commit('DEL_PLAN', id)
    }

  }
}

export default user
