export const state = () => ({
  snackbar: {
    show: false,
    message: '',
    color: 'info'
  },
  layout: {
    bottomNav: true
  },
  inited: true
})

export const mutations = {
  setInited (state, value) {
    state.inited = value
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
