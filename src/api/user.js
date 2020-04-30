import { axios } from '@/utils/request'
export function updateUser(data) {
    return axios({
        url: '/api/user/update',
        method: 'post',
        data:data
    })
}