import Vue from 'vue'
import { Touch } from 'vuetify/lib/directives'
import infiniteScroll from 'vue-infinite-scroll'
import VueClipboard from 'vue-clipboard2'
import Loading from '@/components/basic/Loading.vue'
import NormalPageLayout from '@/components/layout/NormalPageLayout.vue'
import AppBottomNav from '@/components/basic/AppBottomNav.vue'
import AuthCallback from '@/components/basic/AuthCallback.vue'
import MixinAssetLogo from '@/components/basic/MixinAssetLogo.vue'
import PinConfirmDialog from '@/components/basic/PinConfirmDialog.vue'
import QRCode from '@/components/basic/QRCode.vue'
import SliderTabs from '@/components/basic/SliderTabs.vue'
import RequireAuthDialog from '@/components/basic/RequireAuthDialog.vue'

// icons
import IconWallet from '@/components/icons/IconWallet.vue'
import IconDiscover from '@/components/icons/IconDiscover.vue'
import IconMixin from '@/components/icons/IconMixin.vue'
import IconLoan from '@/components/icons/IconLoan.vue'
import IconSwitch from '@/components/icons/IconSwitch.vue'
import IconAddOutline from '@/components/icons/IconAddOutline.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconOTC from '@/components/icons/IconOTC.vue'
import IconRegularInvest from '@/components/icons/IconRegularInvest.vue'
import IconGlobal from '@/components/icons/IconGlobal.vue'

import 'animate.css'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

Vue.directive('touch', Touch)

Vue.use(infiniteScroll)

Vue.component('loading', Loading)
Vue.component('normal-page-layout', NormalPageLayout)
Vue.component('app-bottom-nav', AppBottomNav)
Vue.component('auth-callback', AuthCallback)
Vue.component('mixin-asset-logo', MixinAssetLogo)
Vue.component('pin-confirm-dialog', PinConfirmDialog)
Vue.component('qr-code', QRCode)
Vue.component('slider-tabs', SliderTabs)
Vue.component('require-auth-dialog', RequireAuthDialog)

// icons
Vue.component('icon-wallet', IconWallet)
Vue.component('icon-discover', IconDiscover)
Vue.component('icon-mixin', IconMixin)
Vue.component('icon-loan', IconLoan)
Vue.component('icon-switch', IconSwitch)
Vue.component('icon-add-outline', IconAddOutline)
Vue.component('icon-add', IconAdd)
Vue.component('icon-otc', IconOTC)
Vue.component('icon-regular-invest', IconRegularInvest)
Vue.component('icon-global', IconGlobal)
