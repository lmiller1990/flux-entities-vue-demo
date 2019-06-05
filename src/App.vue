<template>
  <div id="app">
    <UsersContainer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import UsersContainer from './UsersContainer.vue'

export default Vue.extend({
  name: 'app',

  components: {
    UsersContainer
  }
});
</script>

<style>
</style>
