export default {
  onCopy (vue) {
    vue.$toast({ message: vue.$t('common.copy.success'), color: 'info' })
  },
  onError (vue) {
    vue.$toast({ message: vue.$t('common.copy.fail'), color: 'error' })
  }
}