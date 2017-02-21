<template>
  <div id="app" :class="$style.app">
    <header :class="$style.header">
      <nav :class="$style.nav">
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

    data(): any {
      return {
        bg: '',
      };
    },

    computed: {
      bing() {
        return this.$store.getters.activeBing;
      },
    },

    beforeMount(): void {
      preFetch(this.$store);
    },

    mounted(): void {
      console.error(this.bing);
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
    background-color: var(--darkColor);
    color: var(--linkColor);
    @apply --line;
  }

  .menu,
  .option {
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
