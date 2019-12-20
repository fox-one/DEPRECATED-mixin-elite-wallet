<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, ProvideReactive } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

export const MetaKey = Symbol('wallet-meta-data')

@Component
class BalanceMixin extends Vue {
  @Getter('mixin-wallet/getTotalBtc') totalBtc

  @Getter('mixin-wallet/getTotalUsdt') totalUsdt

  @Getter('mixin-profile/logged') logged

  @ProvideReactive(MetaKey)
  get meta () {
    return {
      background: require('@/assets/images/bg-mixin-wallet.png'),
      icon: '$vuetify.icons.iconMixin',
      title: this.$t('component.balance-mixin.title'),
      type: 'mixin',
      name: 'Mixin',
      logged: this.logged,
      totalBtc: this.totalBtc,
      totalUsdt: this.totalUsdt
    }
  }
}
export default BalanceMixin
</script>
<style lang="scss" scoped>
.balancing {
  font-size: 28px;
  font-weight: bold;
}

.balancing-legal {
  opacity: 0.6;
}
</style>
