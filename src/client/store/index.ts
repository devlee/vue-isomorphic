import 'fetch';
import * as Vue from 'vue';
import * as Vuex from 'vuex';

import api from '../../../config/bing/api';

declare var fetch: any;
declare var Request: any;
declare var Headers: any;

Vue.use(Vuex);

const fetchBingImages = (): Promise<Object> => {
  return (
    fetch(new Request(api.cn.url, {
      credentials: 'include',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
      }),
      method: 'GET',
      mode: 'cors',
    }))
    .then((response: any) => Promise.resolve(response.json()))
  );
};

const store = new Vuex.Store({
  actions: {
    FETCH_BING_IMAGES: ({ commit, state }, { date }) => {
      return state.bing[date]
        ? Promise.resolve(state.bing[date])
        : fetchBingImages()
          .then((data: Object) => commit('SET_BING_IMAGES', { date, data }));
    },
  },
  getters: {
    activeBing(state) {
      return state.bing[state.date];
    },
  },
  mutations: {
    SET_BING_IMAGES: (state, { date, data }) => {
      Vue.set(state, 'date', date);
      Vue.set(state.bing, date, data);
    },
  },
  state: {
    bing: {
    },
    date: String(''),
  },
});

export default store;
