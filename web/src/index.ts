import Vue from 'vue';

// @ts-ignore
import moment from 'vue-moment';
Vue.use(moment);

import VueRouter from 'vue-router';
import VueRx from 'vue-rx';

Vue.use(VueRouter);
Vue.use(VueRx);

// @ts-ignore
import Vuikit from 'vuikit';
// @ts-ignore
import VuikitIcons from '@vuikit/icons';

Vue.use(Vuikit);
Vue.use(VuikitIcons);


import { Routes } from './routes';

console.log(window.location.host);

export const router = new VueRouter({
    mode: 'history',
    routes: Routes
});

router.beforeEach((to, from, next) => {
    console.log(to, from);
    next();
});

const app = new Vue({
    router
}).$mount('#app');