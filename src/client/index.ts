import { app, store } from '../universal/app';

declare const process: any;
declare const navigator: Navigator;

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if ('__INITIAL_STATE__' in window) {
  // tslint:disable-next-line:no-string-literal
  store.replaceState(window['__INITIAL_STATE__']);
}

// actually mount to DOM
app.$mount('#app');

// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
