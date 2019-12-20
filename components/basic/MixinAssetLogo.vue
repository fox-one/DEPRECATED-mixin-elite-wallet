<template>
  <div class="logo-wrapper" :style="[{ height: `${size}px` }]">
    <v-img v-if="asset" :width="size" :height="size" :src="asset.icon_url" />
    <div v-if="getChainLogo(asset)" class="chain-logo-wrapper">
      <div class="chain-logo">
        <v-img width="12" height="12" :src="getChainLogo(asset)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
class MixinAssetLogo extends Vue {
  @Prop() asset

  @Prop({ type: Number, default: 40 }) size!: number

  @Getter('mixin-wallet/getAssetById') getAssetById

  getChainLogo (asset) {
    if (asset && asset.chain_id) {
      const chain = this.getAssetById(asset.chain_id)
      return chain ? chain.icon_url : ''
    }
  }
}
export default MixinAssetLogo
</script>
<style lang="scss" scoped>
.logo-wrapper {
  position: relative;
  display: inline-block;
  border-radius: 64px;

  .chain-logo-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 14px;
    height: 14px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    .chain-logo {
      width: 12px;
      height: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #FFFFFF;
      border-radius: 12px;
      box-sizing: content-box;
    }
  }
}
</style>
