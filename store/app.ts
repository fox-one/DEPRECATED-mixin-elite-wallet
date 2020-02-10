import { COLOR_STYLE } from '@/constants'

export const state = () => ({
  snackbar: {
    show: false,
    message: '',
    color: 'info'
  },
  layout: {
    bottomNav: true
  },
  inited: true,
  setting: {
    currency: 'usd',
    colorStyle: COLOR_STYLE.GREEN_UP_RED_DOWN
  }
})

export const mutations = {
  setInited (state, value) {
    state.inited = value
  },
  setSetting (state, value) {
    state.setting = value
  },
  toast (state, { message, color }) {
    state.snackbar.show = true
    state.snackbar.message = message
    state.snackbar.color = color
  },
  setSnackbar (state, val) {
    state.snackbar.show = val
  },
  setLayout (state, val) {
    state.layout = { ...state.layout, ...val }
  }
}
