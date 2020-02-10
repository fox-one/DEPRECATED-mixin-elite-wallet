import { COLOR_STYLE } from '@/constants'

export default {
  colors: {
    red: '#960000',
    green: '#009621'
  },
  getColor (store, value) {
    const colorStyle = store.state.app.setting.colorStyle
    if (colorStyle === COLOR_STYLE.GREEN_UP_RED_DOWN) {
      return Number(value) > 0 ? this.colors.green : this.colors.red
    }
    return Number(value) > 0 ? this.colors.red : this.colors.green
  }
}
