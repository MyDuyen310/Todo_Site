<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: { TheHeader },
  created() {
    this.$store.dispatch("tryLogin");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto:400,700&display=swap");

:root {
  --ff-primary: "Open Sans", "sans-serif";
  --ff-secondary: "Roboto", "sans-serif";
  --clr-white: #fff;
  --clr-black: #000;
  --clr-primary-2: hsl(205, 78%, 60%);
  --clr-blue: #063251;
  --clr-blue-2: #a5d5f8;
  --clr-blue-3: #49a6e9;
  --clr-pink-1: #e66b6c;
  --clr-pink-2: #ec4444;
  --clr-grey: #f4f4f7;
  --clr-green: #6be675;
  --dark-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-size: 14px;
  font-family: var(--ff-primary);
  background: var(--clr-grey);
}
</style>
