import { axios } from "@/utils/request";
export function getWeight(data) {
    return axios({
        url: '/api/weight',
        method: 'post',
        data:data
    })
}
export function addWeight(data) {
    console.log(data)
    return axios({
        url: '/api/weight/add',
        method: 'post',
        data:data
    })
}
export function delWeight(id) {
    return axios({
        url: '/api/weight/'+id+'/del',
        method: 'post'
    })
}

export function getLipid(data) {
    return axios({
        url: '/api/lipid',
        method: 'post',
        data:data
    })
}
export function addLipid(data) {
    console.log(data)
    return axios({
        url: '/api/lipid/add',
        method: 'post',
        data:data
    })
}
export function delLipid(id) {
    return axios({
        url: '/api/lipid/'+id+'/del',
        method: 'post'
    })
}

export function getBloodPressure(data) {
    return axios({
        url: '/api/bloodPressure',
        method: 'post',
        data:data
    })
}
export function addBloodPressure(data) {
    console.log(data)
    return axios({
        url: '/api/bloodPressure/add',
        method: 'post',
        data:data
    })
}
export function delBloodPressure(id) {
    return axios({
        url: '/api/bloodPressure/'+id+'/del',
        method: 'post'
    })
}