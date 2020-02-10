/* eslint-disable no-undef */
import Vue from 'vue'
import {
  mdiArrowLeft,
  mdiArrowUp,
  mdiArrowDown,
  mdiAccountOutline,
  mdiHelpCircleOutline,
  mdiHammer,
  mdiMagnify,
  mdiClose,
  mdiInformation,
  mdiSettings,
  mdiPencilOutline,
  mdiChevronDown,
  mdiMore
} from '@mdi/js'
import errorHandler from '@/utils/errorHandler'
import numUtil from '@/utils/numUtil'
import colorUtil from '@/utils/colorUtil'
import dateUtil from '@/utils/dateUtil'
import copyUtil from '@/utils/copyUtil'
import envUtil from '@/utils/envUtil'
import { ROOT_EVENTS, CURRENCY } from '@/constants'

export default () => {
  Vue.filter('legalify', function (value, store, from, to) {
    const currency = store.state.app.setting.currency
    const unit = CURRENCY[currency].unit
    const v = numUtil.toLegalPrice(store, { from, to, value })
    return `${unit} ${v}`
  })

  Vue.prototype.$legalify = function (store, { from, to, value }) {
    return numUtil.toLegalPrice(store, { from, to, value })
  }

  Vue.prototype.$currency = function (store) {
    const currency = store.state.app.setting.currency
    return CURRENCY[currency].unit
  }

  Vue.prototype.$icons = {
    mdiClose,
    mdiMagnify,
    mdiHammer,
    mdiArrowLeft,
    mdiArrowUp,
    mdiArrowDown,
    mdiAccountOutline,
    mdiHelpCircleOutline,
    mdiInformation,
    mdiSettings,
    mdiPencilOutline,
    mdiChevronDown,
    mdiMore
  }

  Vue.prototype.$toast = function (data: { message: string; color: string }) {
    this.$store.commit('app/toast', data)
  }

  Vue.prototype.$errorHandler = errorHandler

  Vue.prototype.$numUtil = numUtil

  Vue.prototype.$dateUtil = dateUtil

  Vue.prototype.$copyUtil = copyUtil

  Vue.prototype.$envUtil = envUtil

  Vue.prototype.$colors = colorUtil.colors

  Vue.prototype.$colorUtil = colorUtil

  Vue.prototype.$rootEvents = ROOT_EVENTS

  Vue.prototype.$routerPush = function (data) {
    this.$router.push(this.localePath(data))
  }
}
