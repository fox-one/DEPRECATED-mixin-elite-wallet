import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  format (t, p = 'YYYY-MM-DD') {
    return dayjs(t).format(p)
  },

  fromNow (t) {
    return dayjs(t).fromNow()
  },

  isToday (s) {
    return s === this.format(new Date())
  }
}
