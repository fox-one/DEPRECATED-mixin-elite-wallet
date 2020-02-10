<template>
  <v-list color="transparent" class="asset-list-wrapper">
    <v-list-item
      v-for="(asset, index) in showAssets"
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
            ≈ {{ $currency($store) }}{{ $legalify($store, { value: getTotalUsdt(asset), from: 'USD' }) }}
          </span>
        </v-list-item-subtitle>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue, InjectReactive, Prop } from 'vue-property-decorator'
import { AssetsKey } from '@/components/partial/index/AssetsMixin.vue'

@Component
class AssetsList extends Vue {
  @InjectReactive(AssetsKey) assets

  @Prop({ type: String, default: '' }) filter!: string

  get sortedAssets () {
    const assets = this.assets || []
    return assets.concat().sort((b, a) => {
      return Number(a.balance) * Number(a.price_usd) - Number(b.balance) * Number(b.price_usd)
    })
  }

  get showAssets () {
    return this.sortedAssets.filter((asset) => {
      const symbol = asset.symbol.toLowerCase()
      const name = asset.name.toLowerCase()
      const filter = this.filter.toLowerCase()
      return symbol.includes(filter) || name.includes(filter)
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
