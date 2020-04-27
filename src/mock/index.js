const Mock = require('mockjs2')
require('./service/home.js')
require('./service/sms.js')
require('./service/auth.js')
require('./service/article.js')
require('./service/eating.js')
Mock.setup({
  timeout: 800 // setter delay time
})