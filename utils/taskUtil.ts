let $interval: any = ''

let $store: any = ''

let $vue: any = ''


export function setUpPollingTasks (store, vue) {
  $store = store
  $vue = vue
  clearPollingTasks()
  $interval = setInterval(() => {
    refreshUserAssets()
  }, 15000)
}

export function clearPollingTasks () {
  clearInterval($interval)
}

export function refreshUserAssets () {
  $store.dispatch('mixin-wallet/loadAssets')
}