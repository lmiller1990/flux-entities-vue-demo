<template>
  <div>
    <button @click="fetchUsers">Fetch User</button>
    <button @click="clearUsers">Clear State</button>
    <div>
      <div>Pristine: {{ touched }}</div>
      <div>Loading: {{ loading }}</div>
      <div>Loaded: {{ loaded }}</div>
      <ul>
        <li
          v-for="user in users"
          :key="user.id"
        >
          ID: {{ user.id }}. Name: {{ user.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { IUser } from './store'

export default Vue.extend({
  name: 'Users',

  props: {
    users: {
      type: Array as () => IUser[],
      required: true
    },

    loading: {
      type: Boolean,
      required: true
    },

    loaded: {
      type: Boolean,
      required: true
    },

    touched: {
      type: Boolean,
      required: true
    },
  },

  methods: {
    fetchUsers() {
      this.$emit('fetchUsers')
    },

    clearUsers() {
      this.$emit('clearUsers')
    },
  }
})
</script>