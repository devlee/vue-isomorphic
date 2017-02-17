import * as Vue from 'vue';
import * as Router from 'vue-router';

import AboutPageView from '../container/AboutPageView.vue';
import HomePageView from '../container/HomePageView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePageView },
    { path: '/about', component: AboutPageView },
  ],
});
