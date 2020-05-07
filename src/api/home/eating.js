import { axios } from "@/utils/request";
export function getEatingList(id) {
    return axios({
        url: '/api/eating/'+id,
        method: 'get'
    })
}

export function addEating(data) {
    return axios({
        url: '/api/eating/add',
        method: 'post',
        data:data
    })
}
export function delEating($id) {
    return axios({
        url: '/api/eating/'+$id+'/del',
        method: 'post',
    })
}
