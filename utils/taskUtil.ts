let $interval: any = ''

let $store: any = ''

export function setUpPollingTasks (store) {
  $store = store
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
