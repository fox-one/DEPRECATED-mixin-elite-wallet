import { Platform } from '@/interface';
import AuthMixin from '@/utils/auth/AuthMixin'
import AuthFoxone from '@/utils/auth/AuthFoxone'
import StorageUtil from '@/utils/storageUtil'
import { setUpPollingTasks } from '@/utils/taskUtil'
import { StorageKeys } from '@/constants'
import { ClientType } from '@/interface'

export function authLogin(platform: Platform) {
  if (platform === 'foxone') {
    AuthFoxone.requestCode(true)
    return
  }
  if (platform === 'mixin') {
    AuthMixin.requestCode(true)
  }
}

export function logout(store) {
  const commit = store.commit
  commit('mixin-profile/setProfile', {})
  commit('mixin-wallet/setAssets', [])
  StorageUtil.del(StorageKeys.MIXIN_TOKEN)
  StorageUtil.del(StorageKeys.FOX_TOKEN)
}

export async function loadAccountInfo(store, vue) {
  const dispatch = store.dispatch
  const commit = store.commit
  if (!store.getters['mixin-profile/logged']) {
    commit('app/setInited', false)
  }
  try {
    await Promise.all([
      dispatch('mixin-profile/loadProfile')
    ])
    dispatch('mixin-wallet/loadAssets')
    setUpPollingTasks(store, vue)
  } catch (error) {
    if (error.code === 401) {
      logout(store)
    }
  } finally {
    commit('app/setInited', true)
  }
}

export function saveToken({type, token}: {
  type: ClientType
  token: string
}) {
  if (type === 'mixin') {
    StorageUtil.set(StorageKeys.MIXIN_TOKEN, token)
  }
  if (type === 'foxone') {
    StorageUtil.set(StorageKeys.FOX_TOKEN, token)
  }
}

export function getToken({type}: {
  type: ClientType
}) {
  if (process.env.NODE_ENV === 'development' && process.env.TOKEN) {
    return process.env.TOKEN
  }
  if (type === 'mixin') {
    return StorageUtil.get(StorageKeys.MIXIN_TOKEN)
  }
  if (type === 'foxone') {
    return StorageUtil.get(StorageKeys.FOX_TOKEN)
  }
}
