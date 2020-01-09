/* eslint-disable camelcase */
import Vue from 'vue'
import { getAssets, getAssetAddresses } from '@/services/api/mixin'
import numberUtil from '@/utils/numUtil'

export const state = () => ({
  assets: [],
  addressesMap: {}
})

export const getters = {
  getTotalBtc ({ assets }) {
    const total = assets.reduce((acc, asset) => {
      const { price_btc, balance } = asset
      return price_btc * balance + acc
    }, 0)
    return numberUtil.toPrecision(total, 8)
  },
  getTotalBtcById ({ assets }) {
    return (id) => {
      const asset = assets.find(a => a.asset_id === id)
      if (asset) {
        const v = Number(asset.balance) * Number(asset.price_btc)
        return numberUtil.toPrecision(v, 8)
      }
      return 0
    }
  },
  getTotalUsdt ({ assets }) {
    const total = assets.reduce((acc, asset) => {
      const { price_usd, balance } = asset
      return price_usd * balance + acc
    }, 0)
    return numberUtil.toPrecision(total, 2)
  },
  getTotalUsdtById ({ assets }) {
    return (id) => {
      const asset = assets.find(a => a.asset_id === id)
      if (asset) {
        const v = Number(asset.balance) * Number(asset.price_usd)
        return numberUtil.toPrecision(v, 2)
      }
      return 0
    }
  },
  getAssetById ({ assets }) {
    return (id) => {
      return assets.find(a => a.asset_id === id)
    }
  }
}

export const mutations = {
  setAssets (state, assets) {
    state.assets = assets
  },
  setAddresses (state, { addresses, assetId }) {
    Vue.set(state.addressesMap, assetId, addresses)
  }
}

export const actions = {
  async loadAssets ({ commit }) {
    const res = await getAssets()
    commit('setAssets', res)
  },
  async loadAddresses ({ commit }, assetId) {
    const res = await getAssetAddresses(assetId)
    commit('setAddresses', { addresses: res, assetId })
  }
}
