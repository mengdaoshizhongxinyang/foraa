import Mock from 'mockjs2'
import { builder } from '../util'

const Article = (options) => {
    console.log(1)
    const result={
        "msg":"",
        "data":{
            content:"# t #",
            title:"test",
            name:"测试",
            description:"测试",
            avatar:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
    }
    return builder(result)
}


Mock.mock(/\/article\/[1-9][0-9]*/, 'get', Article)

