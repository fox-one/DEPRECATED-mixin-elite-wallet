<template>
  <div class="assets-list">
    <div class="assets-title">
      {{ $t('component.assets-list.title') }}
    </div>
    <v-list color="transparent" class="asset-list-wrapper">
      <v-list-item
        v-for="(asset, index) in sortedAssets"
        :key="index"
        light
        class="asset-item"
        :ripple="false"
        @click="handleAssetClick(asset)"
      >
        <mixin-asset-logo :asset="asset" class="mr-2" />
        <v-list-item-content>
          <v-list-item-title>
            <span class="asset-symbol">
              {{ asset.symbol }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="asset-name">
              {{ asset.name }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-title class="asset-balance-wrapper">
            <span class="asset-balance">{{ asset.balance }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="asset-legal">
              ≈${{ getTotalUsdt(asset) }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue, InjectReactive } from 'vue-property-decorator'
import { AssetsKey } from '@/components/partial/index/AssetsMixin.vue'

@Component
class AssetsList extends Vue {
  @InjectReactive(AssetsKey) assets

  get sortedAssets () {
    const assets = this.assets || []
    return assets.concat().sort((b, a) => {
      return Number(a.balance) * Number(a.price_usd) - Number(b.balance) * Number(b.price_usd)
    })
  }

  getTotalUsdt (asset) {
    const value = Number(asset.balance) * Number(asset.price_usd)
    return this.$numUtil.toPrecision(value, 2)
  }

  handleAssetClick (asset) {
    this.$emit('detail', asset.asset_id)
  }
}
export default AssetsList
</script>

<style lang="scss" scoped>
.assets-title {
  margin: 0 30px;
}

.asset-item {
  font-family: SF UI Display Medium;
  padding: 0 30px;
}

.asset-symbol {
  color: #111111;
  font-family: SF UI Display Bold;
}

.asset-balance-wrapper {
  width: 100%;
  text-align: right;
  font-family: SF UI Display Bold;
}

.asset-balance {
  color: #666666;
}

.asset-name, .asset-legal {
  color: #AFB0BF;
}
</style>
