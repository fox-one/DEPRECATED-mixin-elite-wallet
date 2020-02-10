import BigNumber from 'bignumber.js'
import { formatNumber } from 'accounting-js'

export default {
  getPrecision (n) {
    return new BigNumber(n).dp()
  },
  toFixed (n: string | number, p: number) {
    if (n === undefined || n === null) { return '' }
    return parseFloat('' + n).toFixed(p)
  },
  toPrecision (n: string | number, p: number) {
    const c = new BigNumber(n).dp()
    if (c > p) {
      const v = new BigNumber(n).decimalPlaces(p, 1)
      return v !== null ? v.toString() : ''
    } else {
      return n
    }
  },
  toLegalPrice (store, { from = 'CNY', to, value, precision = 2 }) {
    const rate = store.state.market.rateMap
    const currency = store.state.app.setting.currency
    const v = isNaN(Number(value)) ? 0 : Number(value)
    to = to || currency.toUpperCase()
    from = from.toUpperCase()
    const rf = from === 'CNY' ? 1 : rate[from]
    const rt = to === 'CNY' ? 1 : rate[to]
    const p = !(rf && rt) ? 0 : (rf * v) / rt
    return this.toFixed(p, precision)
  },
  formatPercent (v: string | number, symbol: boolean) {
    v = Number(v)
    if (isNaN(v)) {
      return '- -'
    }
    const s = symbol && v >= 0 ? '+' : ''
    return s + (Number(v) * 100).toFixed(2) + '%'
  },
  formatNumber
}
