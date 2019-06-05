<template>
  <Users
    :users="users"
    :loading="loading"
    :loaded="loaded"
    :touched="touched"
    @clearUsers="clearUsers"
    @fetchUsers="fetchUsers"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapEntities, isLoading, isLoaded } from 'flux-entities'

import Users from './Users.vue'
import { IUser } from './store'

export default Vue.extend({
  name: 'UsersContainer',

  components: {
    Users
  },

  computed: {
    users(): IUser[] {
      return mapEntities(this.$store.state.users)
    },

    loading(): boolean {
      return isLoading(this.$store.state.users)
    },

    loaded(): boolean {
      return isLoaded(this.$store.state.users)
    },

    touched(): boolean {
      return this.$store.state.users.touched
    }
  },

  methods: {
    fetchUsers() {
      this.$store.dispatch('users/fetchUsers')
    },

    clearUsers() {
      this.$store.commit('users/CLEAR_USERS')
    }
  }
})
</script>