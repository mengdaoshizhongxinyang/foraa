
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function getImgs() {
    return axios({
        url: '/api/Imgs',
        method: 'get'
    })
}

export function getTimeList() {
    return axios({
        url: '/api/timeList',
        method: 'get'
    })
}