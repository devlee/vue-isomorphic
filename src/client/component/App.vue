<template>
  <div id="app" :class="$style.app">
    <header :class="$style.header">
      <nav :class="$style.nav">
        <router-link to="/" exact>
          Home
        </router-link>
        <router-link to="/about">
          About
        </router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view :class="$style.view"></router-view>
    </transition>
  </div>
</template>

<style>
  @import '../style/index.css';
</style>

<style lang="postcss" module>
  @import '../style/root.pcss';

  .app {
    color: var(--themeColor);
  }

  .view {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }
</style>
