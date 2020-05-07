import vue from "vue";
import { userInfo } from "os";
export const asyncRouterMap=[
    // {
    //     path: '/',
    //     name: 'index',
    //     component:()=>import ('@/views/Index.vue'),
    //     meta:{title:'首页'}
    // },
    {
        path: '/login',
        name: 'login',
        component:()=>import ('@/views/Login.vue'),
        meta:{title:'登录'}
    },
    {
        path: '/',
        name: 'layout',
        component:()=>import ('@/layouts/BaseView.vue'),
        beforeEnter:((to, from, next) => {

            if(vue.ls.get('User')){
                next();
            }else{
                next({name:'login'})
            }
            
        }),
        children:[
            {
                path: '/',
                name: 'user',
                component:()=>import ('@/views/user/User.vue'),
                meta:{title:'个人中心',back:false}
            },
            {
                path: '/user/info',
                name: 'info',
                component:()=>import ('@/views/user/Info.vue'),
                meta:{title:'个人信息',back:true}
            },
            {
                path: '/user/setting',
                name: 'setting',
                component:()=>import ('@/views/user/Setting.vue'),
                meta:{title:'设置',back:true}
            },
            {
                path: '/user/advice',
                name: 'advice',
                component:()=>import ('@/views/user/Advice.vue'),
                meta:{title:'建议反馈',back:true}
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
                component:()=>import ('@/views/home/Index.vue'),
                meta:{title:'计划',back:false}
            },
            {
                path: '/state',
                name: 'state',
                component:()=>import ('@/views/state/Index.vue'),
                meta:{title:'个人状况',back:false}
            }
        ]
    },

]