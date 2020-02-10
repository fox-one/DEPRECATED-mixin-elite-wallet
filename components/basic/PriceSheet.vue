<template>
  <v-bottom-sheet v-model="sheet">
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon size="20">
          {{ $icons.mdiMore }}
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ asset.symbol }} {{ $t('common.price') }}
      </v-card-title>
      <v-list>
        <v-list-item v-for="(item, index) in priceItems" :key="index">
          <v-list-item-title class="symbol">
            {{ item.symbol }}
          </v-list-item-title>
          <div class="text-right price">
            <div>
              {{ item.price }}
            </div>
            <div class="caption" :style="{ color: $colorUtil.getColor($store, item.change) }">
              {{ $numUtil.formatPercent(item.change) }}
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
class PriceSheet extends Vue {
  @Prop() asset

  sheet = false

  get priceItems () {
    const symbol = this.asset.symbol
    const changeUSD = this.asset.change_usd
    const changeBTC = this.asset.change_btc
    const priceUSD = this.$legalify(this.$store, { value: this.asset.price_usd, to: 'USD', from: 'USD' })
    const priceCNY = this.$legalify(this.$store, { value: this.asset.price_usd, to: 'CNY', from: 'USD' })
    return [
      { symbol: `${symbol}/BTC`, price: this.asset.price_btc, change: changeBTC },
      { symbol: `${symbol}/USD`, price: priceUSD, change: changeUSD },
      { symbol: `${symbol}/CNY`, price: priceCNY, change: changeUSD }
    ]
  }
}
export default PriceSheet
</script>

<style lang="scss">
.symbol {
  font-family: SF UI Display Bold;
}

.price {
  font-family: SF UI Display Medium;
  line-height: 1;
}
</style>
