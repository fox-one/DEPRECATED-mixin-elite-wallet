import { DEFAULT_SUB_BOTS } from '@/constants'

export const state = () => ({
  bots: DEFAULT_SUB_BOTS
})

export const getters = {
}

export const mutations = {
  toggleBot (state, id) {
    const added = state.bots.includes(id)
    if (added) {
      const index = state.bots.findIndex(b => b === id)
      state.bots.splice(index, 1)
    } else {
      state.bots.push(id)
    }
  }
}

export const actions = {
}
