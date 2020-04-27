import Mock from 'mockjs2'
import { builder } from '../util'

const Home = (options) => {
    const result={
        "msg":"",
        "data":[
            {"icon":"/img/file.png"}
        ]
    }
    return builder(result)
}

const Imgs = (options) => {
    const result={
        "msg":"",
        "data":[
            {"url":"/img/img.png","type":"link","to":""},
            {"url":"/img/img.png","type":"link","to":""},
            {"url":"/img/img.png","type":"push","to":""}
        ]
    }
    return builder(result)
}

const Times = (options) => {
    const result={
        "msg":"",
        "data":[
            {"do":"...","type":"day","selected":"","start_time":"9:30","end_time":"11:50"},
            {"do":"...","type":"week","selected":"4","start_time":"12:30","end_time":"14:50"},
            {"do":"...","type":"day","selected":"","start_time":"17:30","end_time":"19:50"},
        ]
    }
    return builder(result)
}

Mock.mock(/\/api\/Home/, 'post', Home)
Mock.mock(/\/api\/Imgs/, 'get', Imgs)
Mock.mock(/\/api\/timeList/, 'get', Times)