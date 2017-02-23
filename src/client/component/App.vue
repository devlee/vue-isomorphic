<template>
  <div id="app" :class="$style.app">
    <header :class="$style.header" :style="bgStyle">
      <nav :class="$style.nav" :style="bgStyle">
        <ul :class="$style.menu">
          <li>
            <router-link to="/" exact>
              Home
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              About
            </router-link>
          </li>
        </ul>
        <ul :class="$style.option">
          <li>
            <a href="https://github.com/devlee/" target="_blank">Github</a>
          </li>
        </ul>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view :class="$style.view"></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
  import api from '../../../config/bing/api.ts';

  const fetchBingImages = ({ dispatch }: any): Function => {
    const date: Date = new Date();
    const dateFormat: String = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
    return dispatch('FETCH_BING_IMAGES', {
      date: dateFormat,
    });
  };

  const preFetch = ({ dispatch }: any): Function[] => {
    const tasks: Function[] = [];
    tasks.push(fetchBingImages({ dispatch }));
    return tasks;
  };

  export default {
    preFetch,

    computed: {
      bgStyle() {
        const activeBing = this.$store.getters.activeBing;
        let result = '';

        if (activeBing && activeBing.images) {
          if (activeBing.images.length) {
            result = `${api.cn.domain}${activeBing.images[0].url}`;
          }
        }

        return { 'background-image': `url(${result});` };
      },
    },

    beforeMount(): void {
      preFetch(this.$store);
    },
  };
</script>

<style>
  @import 'normalize.css';
  @import '../style/index.css';
</style>

<style lang="postcss" module>
  @import '../style/root.pcss';

  .app {
    color: var(--fontColor);
    background: #fff;
  }

  .header {
    width: 100%;
    height: 360px;
    background-color: var(--greyColor);
    background-size: cover;
    background-position: center;
  }

  .nav {
    width: 100%;
    background-color: color(var(--darkColor) alpha(-70%));
    background-size: cover;
    color: var(--linkColor);
    @apply --line;
    @apply --scrubEffect;
  }

  .menu,
  .option {
    position: relative;
    @apply --hList;
    a {
      @apply --link;
    }
  }

  .option {
    float: right;
  }

  .view {
    max-width: var(--maxWidth);
    margin: 0 auto;
    position: relative;
  }
</style>
