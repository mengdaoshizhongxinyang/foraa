import { axios } from '@/utils/request'
export function addAdvice(data) {
    return axios({
        url: '/api/advice/add',
        method: 'post',
        data:data
    })
}