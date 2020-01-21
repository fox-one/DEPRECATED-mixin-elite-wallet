export const isProduct = process.env.APP_ENV === 'prod'

export const MIXIN_CLIENT_ID = process.env.MIXIN_CLIENT_ID

export const FOX_CLIENT_ID = process.env.FOX_CLIENT_ID

export const ATM_URL = process.env.ATM_URL

export const REGULAR_INVEST_URL = process.env.REGULAR_INVEST_URL

export const OTC_URL = process.env.OTC_URL

export const MIXIN_API_HOST = 'https://mixin-api.zeromesh.net/'

export const MIXIN_OAUTH_HOST = 'https://mixin.one'

export const FOXONE_API_HOST = 'https://api1.kumiclub.com/api/v2'

export const FOX_OAUTH_HOST = 'https://oauth2.kumiclub.com'

export const ROOT_EVENTS = {
  PIN_ENTER: 'pin_enter',
  ASSETS_FORBIDDEN: 'assets_forbidden'
}

export const MIXIN_DEPOSIT_HELP = {
  en: 'https://mixinmessenger.zendesk.com/hc/en-us/articles/360018789931-How-to-deposit-on-Mixin-Messenger-',
  zh: 'https://mixinmessenger.zendesk.com/hc/zh-cn/articles/360018789931-%E5%A6%82%E4%BD%95%E5%85%85%E5%80%BC-'
}

export const ATM_SUPPORT_ASSETS = ['USDT', 'BTC', 'EOS', 'ETH', 'XIN', 'XRP', 'ZEC', 'BOX', 'DOGE']

export const OTC_SUPPORT_ASSETS = ['USDT']

export const DEFAULT_SUB_BOTS = ['7000101487', '7000100141', '7000101914', '7000102362', '7000102275', '7000102035', '7000101996']

export enum StorageKeys {
  FOX_TOKEN = 'foxone_token',
  MIXIN_TOKEN = 'mixin_token'
}
