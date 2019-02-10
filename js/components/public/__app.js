import Vue       from 'Vue';
import Vuex      from 'Vuex';
import VueRouter from 'VueRouter';

Vue.use(Vuex);
Vue.use(VueRouter);

import Account   from './Account.vue';

import filter    from '../../modules/all/filter.js';
import general   from '../../modules/all/general.js';
import schedule  from '../../modules/all/schedule.js';

import format    from '../../plugins/all/format.js';

Vue.use(format);



let store = new Vuex.Store({
    modules: {filter, general, schedule}
});



let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/:phone',
            component: Account,
            props: true
        }
    ]
});



new Vue({
    el: '#app',
    store,
    router
});