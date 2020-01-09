export default {
  set (key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get (key: string) {
    const value = localStorage.getItem(key)
    return value && JSON.parse(value)
  },
  del (key: string) {
    localStorage.removeItem(key)
  }
}
