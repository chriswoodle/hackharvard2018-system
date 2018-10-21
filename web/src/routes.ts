import { RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';

import PageNotFound from './page-not-found.vue';
import Dashboard from './dashboard.vue';
import Util from './util.vue';

import Main from './main.vue';


// Routes resolved in order
export const Routes: RouteConfig[] = [
    {
        path: '/',
        component: Main,
        children: [
            {
                path: '/',
                beforeEnter: (to, from, next) => next({ name: 'dashboard', replace: true })
            },
            {
                path: '/',
                component: Dashboard,
                name: 'dashboard'
            }, 
            {
                path: '/util',
                component: Util,
                name: 'util'
            },
        ],
    },
    { path: '**', component: PageNotFound }
];