import Mock from 'mockjs2'
import { builder,getBody } from '../util'

const list = (options) => {
    const result={
        "msg":"",
        "data":[{
            time:"2019-07-11 8:54:11",
            remarks:"早饭",
            content:"蛋",
            id:12
        },{
            time:"2019-07-11 18:54:11",
            remarks:"晚饭",
            content:"饭",
            id:15
        }]
    }
    return builder(result)
}
const add = (options) => {
    const result={
        "msg":"",
        "code":0
    }
    return builder(result)
}

Mock.mock(/\/api\/eating/, 'get', list)
Mock.mock(/\/api\/eating\/add/, 'post', add)