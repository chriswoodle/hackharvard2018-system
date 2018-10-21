import { RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';

import PageNotFound from './page-not-found.vue';
import Dashboard from './dashboard.vue';
import Providers from './providers.vue';
import Splash from './splash.vue';
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
                component: Splash,
                name: 'splash'
            },
            {
                path: '/dashboard',
                component: Dashboard,
                name: 'dashboard'
            }, 
            {
                path: '/util',
                component: Util,
                name: 'util'
            },
            {
                path: '/providers',
                component: Providers,
                name: 'providers'
            },
        ],
    },
    { path: '**', component: PageNotFound }
];