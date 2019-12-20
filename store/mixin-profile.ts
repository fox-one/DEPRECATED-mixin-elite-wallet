import Vue from 'vue'
import { getProfile } from '@/services/api/mixin'

export const state = () => ({
  profile: {}
})

export const getters = {
  logged(state) {
    return state.profile.user_id
  }
}

export const mutations = {
  setProfile (state, profile) {
    Vue.set(state, 'profile', profile)
  }
}

export const actions = {
  async loadProfile ({ commit }) {
    const res = await getProfile()
    commit('setProfile', res)
  }
}