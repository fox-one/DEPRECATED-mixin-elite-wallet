import Vue from 'vue'
import { 
  mdiArrowLeft, 
  mdiArrowUp, 
  mdiArrowDown, 
  mdiAccountOutline, 
  mdiHelpCircleOutline,
  mdiHammer
} from '@mdi/js'
import errorHandler from '@/utils/errorHandler'
import numUtil from '@/utils/numUtil'
import colorUtil from '@/utils/colorUtil'
import dateUtil from '@/utils/dateUtil'
import copyUtil from '@/utils/copyUtil'
import { ROOT_EVENTS } from '@/constants'

export default () => {
  Vue.prototype.$icons = {
    mdiHammer,
    mdiArrowLeft, 
    mdiArrowUp, 
    mdiArrowDown,
    mdiAccountOutline,
    mdiHelpCircleOutline
  }

  Vue.prototype.$toast = function (data: { message: string; color: string }) {
    this.$store.commit('app/toast', data)
  }

  Vue.prototype.$errorHandler = errorHandler
  
  Vue.prototype.$numUtil = numUtil

  Vue.prototype.$dateUtil = dateUtil

  Vue.prototype.$copyUtil = copyUtil

  Vue.prototype.$colors = colorUtil.colors

  Vue.prototype.$rootEvents = ROOT_EVENTS

  Vue.prototype.$routerPush = function (data) {
    this.$router.push(this.localePath(data))
  }
}