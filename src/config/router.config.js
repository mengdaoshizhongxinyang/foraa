import vue from "vue";
import { userInfo } from "os";
import store from "@/store"
import { getPlan } from "@/api/show/plan.js";
import { mapState, mapActions } from "vuex";
import moment from "moment";
import { timeFix } from "@/utils/util"
import notification  from 'ant-design-vue/lib/notification';
let times = 0
export const asyncRouterMap = [
    // {
    //     path: '/',
    //     name: 'index',
    //     component:()=>import ('@/views/Index.vue'),
    //     meta:{title:'首页'}
    // },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layouts/BaseView.vue'),
        beforeEnter: ((to, from, next) => {
            if (vue.ls.get('User')) {
                if (times === 0) {
                    times++;
                    store.dispatch('getPlan', vue.ls.get('User').id).then(res => {
                        let isRest=true
                        let time=new moment().format("HH:mm:ss");
                        let msg=""
                        let planList=store.state.plan.plan.filter(item=>{
                            return item.date===7 || item.date ==new moment().format("d");
                        })
                        for(let i=0;i<planList.length;i++){
                            if(planList[i].start<time && planList[i].end>time){
                                isRest=false
                                msg=`现在是${planList[i].title}时间,好好加油！`
                            }
                        }
                        if(isRest){
                            msg="现在是休息时间，要更爱生活哦！"
                        }
                        notification.success({
                            message: `${timeFix()}，欢迎回来`,
                            description: msg
                        });
                    })
                }
                next();
            } else {
                next({ name: 'login' })
            }

        }),
        children: [
            {
                path: '/',
                name: 'user',
                component: () => import('@/views/user/User.vue'),
                meta: { title: '个人中心', back: false, icon: 'user' }
            },
            {
                path: '/user/info',
                name: 'info',
                component: () => import('@/views/user/Info.vue'),
                meta: { title: '个人信息', back: true, icon: 'user' }
            },
            {
                path: '/user/setting',
                name: 'setting',
                component: () => import('@/views/user/Setting.vue'),
                meta: { title: '设置', back: true, icon: 'user' }
            },
            {
                path: '/user/advice',
                name: 'advice',
                component: () => import('@/views/user/Advice.vue'),
                meta: { title: '建议反馈', back: true, icon: 'user' }
            },
            // {
            //     path: '/article',
            //     name: 'daily',
            //     component:()=>import ('@/views/article/List.vue'),
            //     meta:{title:'每日',back:false}
            // },
            // {
            //     path: '/article/:id',
            //     name: 'article',
            //     component:()=>import ('@/views/article/Article.vue'),
            //     meta:{title:'详情',back:false}
            // },
            {
                path: '/home',
                name: 'daily',
                component: () => import('@/views/home/Index.vue'),
                meta: { title: '计划', back: false, icon: 'daily' }
            },
            {
                path: '/state',
                name: 'state',
                component: () => import('@/views/state/Index.vue'),
                meta: { title: '个人状况', back: false, icon: 'state' }
            }
        ]
    },

]