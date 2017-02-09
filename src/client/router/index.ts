import * as Vue from 'vue';
import * as Router from 'vue-router';

Vue.use(Router);

import HomePageView from '../component/HomePageView.vue';

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePageView },
  ],
});
