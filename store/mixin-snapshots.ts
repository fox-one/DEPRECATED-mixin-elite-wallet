import { getSnapshots, getExternalTransactions } from '@/services/api/mixin'
import dateUtil from '@/utils/dateUtil'

export const state = () => ({
  snapshots: [],
  externals: [],
  hasNext: true
})

export const getters = {
  getSnapshots(state) {
    return state.snapshots
  },
  getGroupedSnapshots(state) {
    const externals = state.externals.map(e => ({ ...e, display: 'external' }))
    const all = [...state.snapshots, ...externals]
    const data = all.reduce((group, snapshot) => {
      const date = dateUtil.format(snapshot.created_at, 'YYYY/MM/DD')
      if (!group[date]) {
        group[date] = []
      }
      group[date].push(snapshot)
      return group
    }, {})
    Object.keys(data).map((date) => {
      const items = data[date]
      items.sort((a, b) => { 
        const t1 = new Date(a.created_at).getTime()
        const t2 = new Date(b.created_at).getTime()
        return t2 - t1
      })
    })
    return data
  }
}

export const mutations = {
  setExternals(state, externals) {
    state.externals = state.externals.concat(externals)
  },
  setSnapshots(state, snapshots) {
    state.snapshots = state.snapshots.concat(snapshots)
    if (snapshots.length < 10) {
      state.hasNext = false
    } else {
      state.hasNext = true
    }
  },
  removeExternals(state) {
    state.externals = []
  },
  removeSnapshots(state) {
    state.snapshots = []
    state.hasNext = true
  }
}

export const actions = {
  async loadSnapshots({ commit, state }, assetId) {
    const { snapshots: oldSnapshots } = state
    const last = oldSnapshots[oldSnapshots.length - 1]
    const offset = last && last.created_at
    const params = { asset: assetId, limit: 10, offset }
    const snapshots = await getSnapshots(params)
    commit('setSnapshots', snapshots)
  },
  async loadExternals({ state, commit }, params) {
    const { externals: oldExternals } = state
    const last = oldExternals[oldExternals.length - 1]
    const offset = last && last.created_at
    let hasNext = true
    do {
      const externals = await getExternalTransactions({ ...params, limit: 500, offset })
      if (externals.length < 500) {
        hasNext = false
      }
      commit('setExternals', externals)
    } while(hasNext)
  }
}