import { getRate } from '~/services/api/currency'

export const state = () => ({
  rateMap: {}
})

export const mutations = {
  setRateMap (state, data) {
    state.rateMap = { ...state.rateMap, ...data }
  }
}

export const actions = {
  async loadRate ({ commit }) {
    const rate = await getRate()
    const map = rate.cnyTickers.reduce((acc, ticker) => {
      const currency = ticker.from.toUpperCase()
      acc[currency] = ticker.price
      return acc
    }, {})
    commit('setRateMap', map)
  }
}
