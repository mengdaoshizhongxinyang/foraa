import { axios } from "@/utils/request";
export function getEatingList() {
    return axios({
        url: '/api/eating',
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
