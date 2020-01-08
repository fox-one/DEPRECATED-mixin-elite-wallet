export default {
  getMixinContext () {
    const w: any = window
    let ctx;
    switch (this.isMixin()) {
      case 'iOS':
        ctx = prompt('MixinContext.getContext()')
        return JSON.parse(ctx)
      case 'Android':
        ctx = w.MixinContext.getContext()
        return JSON.parse(ctx)
      default:
        return undefined
    }
  },
  isMixin () {
    const w: any = window
    if (w.webkit && w.webkit.messageHandlers && w.webkit.messageHandlers.MixinContext) {
      return 'iOS'
    }
    if (w.MixinContext && w.MixinContext.getContext) {
      return 'Android'
    }
    return undefined
  },
  reloadTheme () {
    const w: any = window
    switch (this.isMixin()) {
      case 'iOS':
        w.webkit.messageHandlers.reloadTheme.postMessage('');
        return
      case 'Android':
        w.MixinContext.reloadTheme()
        return
    }
  },
  isFoxONE() {
    return /FoxOne/i.test(navigator.userAgent)
  }
}