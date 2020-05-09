import { axios } from "@/utils/request";
export function getPlan(id) {
    return axios({
        url: '/api/plan/'+id,
        method: 'get'
    })
}
export function addPlan(data) {
    return axios({
        url: '/api/plan/add',
        method: 'post',
        data: data
    })
}
export function delPlan(id) {
    return axios({
        url: '/api/plan/' + id + '/del',
        method: 'post'
    })
}
export function updatePlan(id,data) {
    return axios({
        url: '/api/plan/' + id + '/update',
        method: 'post',
        data:data
    })
}