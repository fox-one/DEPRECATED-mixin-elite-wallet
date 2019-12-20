import Vue from 'vue';
import { getUser } from '@/services/api/mixin'

export const state = () => ({
  users: {},
  locks: {}
})

export const getters = {
  getUserById(state) {
    return id => {
      return state.users[id]
    }
  }
}

export const mutations = {
  setUser(state, { user, id }) {
    Vue.set(state.users, id, user)
  },
  lock(state, id) {
    Vue.set(state.locks, id, true)
  },
  unLock(state, id) {
    Vue.set(state.locks, id, false)
  }
}

export const actions = {
  async loadUser({ commit, state }, id) {
    if (!id) { return }
    const loaded = state.users[id]
    const locked = state.locks[id]
    if (loaded || locked) { return }
    commit('lock', id)
    const user = await getUser(id)
    commit('setUser', { id, user })
    commit('unLock', id)
  }
}