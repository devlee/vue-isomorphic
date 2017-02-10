<template>
  <div id="app" :class="$style.app">
    <header :class="$style.header">
      <nav :class="$style.nav">
        <router-link to="/" exact>
        </router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view :class="$style.view"></router-view>
    </transition>
  </div>
</template>

<style module>
  .app {
    color: red;
  }
</style>
