import Vue from 'vue'
import Vuex, { Module } from 'vuex'
import { IAjaxState } from 'flux-entities'

Vue.use(Vuex)

export interface IUser {
  id: number
  name: string
}

type TError = {
  code: 401 | 404
  message: string
}

interface IUsersState extends IAjaxState<IUser, TError> {}

const initialUsersState: IUsersState = {
  all: {},
  ids: [],
  loading: false,
  touched: false,
  errors: []
}

const fakeApiCall = (): Promise<IUser[]> => {
  return new Promise<IUser[]>(res => {
    setTimeout(() => {
      res(
        [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
          { id: 3, name: 'Catherine' },
        ]
      )
    }, 1000)
  })
}

const users: Module<IUsersState, {}> = {
  namespaced: true,

  state: {
    ...initialUsersState
  },

  mutations: {
    CLEAR_USERS(state) {
      for (const key of Object.keys(initialUsersState)) {
        // @ts-ignore
        // since we are using the flux-entities pattern, we know this is okay
        state[key] = initialUsersState[key]
      }
    },

    FETCH_USERS_FAILURE(state, payload: TError) {
      state.errors = [payload]
      state.loading = false
    },

    FETCH_USERS_REQUEST(state) {
      state.loading = true
      state.touched = true
    },

    FETCH_USERS_SUCCESS(state, payload: IUser[]) {
      const { all, ids } = payload.reduce<IUsersState>((acc, curr) => {
        return {
          ...state,
          ids: Array.from(new Set([...acc.ids, curr.id])),
          all: { ...acc.all, [curr.id]: curr }
        }
      }, { ...state })

      state.all = all
      state.ids = ids
      state.loading = false
    }
  },

  actions: {
    async fetchUsers({ commit }) {
      commit('FETCH_USERS_REQUEST')

      try {
        const response = await fakeApiCall()
        commit('FETCH_USERS_SUCCESS', response)
      } catch (e) {
        // assuming `e` has `message` and `code` - this is made up for the purpose
        // of the example project.
        commit('FETCH_USERS_FAILURE', { message: e.message, code: e.code })
      }
    }
  }
}


const store = new Vuex.Store({
  modules: {
    users
  }
})

export { store }