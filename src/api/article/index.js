import { axios } from "@/utils/request";
export function getArticle(data) {
    return axios({
        url: `/article/${data}`,
        method: 'get'
    })
}