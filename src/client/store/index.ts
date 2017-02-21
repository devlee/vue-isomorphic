import 'fetch';
import * as Vue from 'vue';
import * as Vuex from 'vuex';

import api from '../../../config/bing/api';

Vue.use(Vuex);

const fetchBingImages = (date: String): Promise<Object> => {
  return (
    fetch(new Request(api.cn.url, {
      credentials: 'include',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
      }),
      method: 'GET',
      mode: 'cors',
    }))
    .then((response: Response) => Promise.resolve(response.json()))
  );
};

const store = new Vuex.Store({
  actions: {
    FETCH_BING_IMAGES: ({ commit, state }, { date }) => {
      return state.bing[date]
        ? Promise.resolve(state.bing[date])
        : fetchBingImages(date)
          .then((data: Object) => commit('SET_BING_IMAGES', { date, data }));
    },
  },
  getters: {
    activeBing(state, getters) {
      return state.bing;
    },
  },
  mutations: {
    SET_BING_IMAGES: (state, { date, data }) => {
      Vue.set(state.bing, date, data);
    },
  },
  state: {
    bing: {
    },
  },
});

export default store;
