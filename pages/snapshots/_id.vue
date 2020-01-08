<template>
  <div class="snapshots-page">
    <div class="header">
      <v-app-bar flat color="transparent">
        <v-btn color="#fff" icon @click="handleBack">
          <v-icon size="28">
            {{ $icons.mdiArrowLeft }}
          </v-icon>
        </v-btn>
      </v-app-bar>
      <div class="balancing">
        <div class="total-balance">
          <v-skeleton-loader dark :loading="!inited" type="heading">
            {{ balance }} {{ asset && asset.symbol }}
          </v-skeleton-loader>
        </div>
        <div class="total-legal">
          <v-skeleton-loader dark :loading="!inited" type="text">
            ≈${{ totalLegal }}
          </v-skeleton-loader>
        </div>
      </div>
      <actions
        :asset-id="assetId"
        :asset="asset"
        @send="handleSend"
        @receive="handleReceive"
        @exchange="handleExchange"
        @otc="handleOTC"
        @regularInvest="handleRegularInvest"
      />
      <snapshots :asset-id="assetId" :asset="asset" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Actions from '@/components/partial/snapshot/Actions.vue'
import Snapshots from '@/components/partial/snapshot/Snapshots.vue'
import { ATM_URL, REGULAR_INVEST_URL, OTC_URL } from '@/constants'

@Component({
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'theme-color',
          name: 'theme-color',
          content: '#0596FF'
        }
      ]
    }
  },
  components: {
    Actions,
    Snapshots
  }
})
class SnapshotsPage extends Vue {
  @Getter('mixin-wallet/getAssetById') getAssetById

  get title () {
    return this.$t('document.snapshot.title')
  }

  get inited () {
    return this.asset
  }

  get assetId () {
    return this.$route.params.id as string
  }

  get asset () {
    return this.getAssetById(this.assetId)
  }

  get balance () {
    if (!this.asset) { return '-' }
    return this.asset.balance
  }

  get totalLegal () {
    if (!this.asset) { return '-' }
    const value = Number(this.asset.balance) * Number(this.asset.price_usd)
    return this.$numUtil.toPrecision(value, 2)
  }

  handleSend () {
    this.$routerPush({ name: 'addresses-id', params: { id: this.assetId } })
  }

  handleReceive () {
    this.$routerPush({ name: 'deposit', query: { id: this.assetId } })
  }

  handleExchange () {
    window.location.href = `${ATM_URL}?wanted=${this.asset.symbol}`
  }

  handleOTC () {
    window.location.href = OTC_URL as string
  }

  handleRegularInvest () {
    window.location.href = REGULAR_INVEST_URL as string
  }

  handleBack () {
    this.$routerPush({ name: 'index' })
  }
}
export default SnapshotsPage
</script>

<style lang="scss" scoped>
.snapshots-page {
  height: 100%;
  background-image: url('~assets/images/bg-mixin-wallet.png');
  background-size: 100% 292px;
  background-repeat: no-repeat;
  position: relative;
  z-index: 1;
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    width: 100%;
    height: 34px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, #0596FF 0%, rgba(5, 150, 255, 0) 100%);
    background-size: 100% 34px;
    background-repeat: no-repeat;
    z-index: -1;
  }

  .header {
    color: #fff;
    height: 56px;

    .balancing {
      font-family: SF Compact Display Medium;
      margin: 0 20px;
      height: 66px;

      .total-balance {
        font-size: 28px;
        font-weight: bold;
        height: 42px;
      }

      .total-legal {
        opacity: 0.6;
      }
    }
  }
}
</style>
