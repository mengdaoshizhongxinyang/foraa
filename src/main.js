import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import store from './store/'
import Storage from 'vue-ls'
import './mock'
import 'ant-design-vue/dist/antd.css'
import Directives from '@/utils/directives.js';
const options = {
  namespace: 'vuejs__', 
  name: 'ls', 
  storage: 'local',
};
 
Vue.use(Storage, options);
Vue.use(Directives)
Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
