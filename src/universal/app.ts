// tslint:disable-next-line no-reference
/// <reference path="../../config/@types/index.d.ts" />

import * as Vue from 'vue';
import { sync } from 'vuex-router-sync';

import App from '../client/component/App.vue';
import router from '../client/router';
import store from '../client/store';

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
const app = new Vue({
  router,
  store,
  ...App,
});

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export { app, router, store };
