import Mock from 'mockjs2'
import { builder } from '../util'

const smsCaptcha = () => {
    return builder({ captcha: "123145" })
  }


  Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
