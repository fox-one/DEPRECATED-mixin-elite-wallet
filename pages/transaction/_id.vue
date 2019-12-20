<template>
  <normal-page-layout :has-back="true" @back="back">
    <template #title>
      {{ $t('page.transaction.title') }}
    </template>
    <div class="transaction-page">
      <v-skeleton-loader :loading="loading" type="article">
        <v-card class="overflow-y-auto pa-5">
          <div class="mb-5">
            <div class="mb-5 text-center">
              <mixin-asset-logo :size="64" :asset="asset" />
            </div>
            <div class="text-center amount-info">
              <span class="amount-text" :style="[{ color: amountColor }]">
                {{ amountText }}
              </span>
              <span>{{ symbol }}</span>
            </div>
            <div class="amount-usd">
              ≈${{ usdAmount }}
            </div>
          </div>
          <div class="pb-5">
            <div
              v-clipboard:copy="detail.snapshot_id"
              v-clipboard:success="() => $copyUtil.onCopy(this)"
              v-clipboard:error="() => $copyUtil.onError(this)"
              class="f-field-item column"
            >
              <div class="f-field-label">
                {{ $t('page.transaction.label.snapshot-id') }}
              </div>
              <div class="f-field-value">
                {{ detail.snapshot_id || '-' }}
              </div>
            </div>
            <div
              v-clipboard:copy="type"
              v-clipboard:success="() => $copyUtil.onCopy(this)"
              v-clipboard:error="() => $copyUtil.onError(this)"
              class="f-field-item column"
            >
              <div class="f-field-label">
                {{ $t('page.transaction.label.type') }}
              </div>
              <div class="f-field-value">
                {{ type }}
              </div>
            </div>
            <div
              v-if="name"
              v-clipboard:copy="name"
              v-clipboard:success="() => $copyUtil.onCopy(this)"
              v-clipboard:error="() => $copyUtil.onError(this)"
              class="f-field-item column"
            >
              <div class="f-field-label">
                {{ $t('page.transaction.label.reciepient') }}
              </div>
              <div class="f-field-value">
                {{ name }}
              </div>
            </div>
            <div
              v-if="sender"
              v-clipboard:copy="sender"
              v-clipboard:success="() => $copyUtil.onCopy(this)"
              v-clipboard:error="() => $copyUtil.onError(this)"
              class="f-field-item column"
            >
              <div class="f-field-label">
                {{ $t('page.transaction.label.sender') }}
              </div>
              <div class="f-field-value">
                {{ sender }}
              </div>
            </div>
            <div
              v-if="hash"
              v-clipboard:copy="hash"
              v-clipboard:success="() => $copyUtil.onCopy(this)"
              v-clipboard:error="() => $copyUtil.onError(this)"
              class="f-field-item column"
            >
              <div class="f-field-label">
                {{ $t('page.transaction.label.hash') }}
              </div>
              <div class="f-field-value">
                {{ hash }}
              </div>
            </div>
            <div
              v-clipboard:copy="detail.data"
              v-clipboard:success="() => $copyUtil.onCopy(this)"
              v-clipboard:error="() => $copyUtil.onError(this)"
              class="f-field-item column"
            >
              <div class="f-field-label">
                {{ $t('page.transaction.label.memo') }}
              </div>
              <div class="f-field-value">
                {{ detail.data || '-' }}
              </div>
            </div>
            <div class="f-field-item column">
              <div class="f-field-label">
                {{ $t('page.transaction.label.time') }}
              </div>
              <div class="f-field-value">
                {{ $dateUtil.format(detail.created_at, 'YYYY/MM/DD HH:mm:ss') }}
              </div>
            </div>
          </div>
        </v-card>
      </v-skeleton-loader>
    </div>
  </normal-page-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { getSnapshot } from '@/services/api/mixin'

@Component({
  head () {
    return {
      title: this.title
    }
  }
})
class TransactionPage extends Vue {
  @Getter('mixin-wallet/getAssetById') getAssetById

  @Getter('mixin-users/getUserById') getUserById

  @Action('mixin-users/loadUser') loadUser

  detail: any = {}

  loading = false

  validType = ['transfer', 'deposit', 'withdrawal', 'fee', 'rebate']

  get title () {
    return this.$t('document.transaction.title')
  }

  get id () {
    return this.$route.params.id as string
  }

  get user () {
    return this.getUserById(this.detail.opponent_id)
  }

  get name () {
    const user = this.user
    return user ? user.full_name || this.detail.opponent_id : this.detail.opponent_id
  }

  get asset () {
    return this.detail.asset || {}
  }

  get walletAsset () {
    return this.getAssetById(this.asset.asset_id)
  }

  get logo () {
    return this.asset.icon_url
  }

  get symbol () {
    return this.asset.symbol || ''
  }

  get amountText () {
    if (!this.detail.amount) { return '-' }
    const amount = this.detail.amount
    const value = Number(amount)
    const text = value > 0 ? `+${amount}` : amount
    return `${text}`
  }

  get amountColor () {
    const value = Number(this.detail.amount)
    return value > 0 ? this.$colors.green : this.$colors.red
  }

  get usdAmount () {
    if (!this.walletAsset) { return '-' }
    if (!this.detail.amount) { return '-' }
    const price = this.walletAsset.price_usd
    const amount = this.detail.amount
    return this.$numUtil.toPrecision(Number(price) * Number(amount), 2)
  }

  get time () {
    if (!this.detail.created_at) { return '-' }
    return this.$dateUtil.format(this.detail.created_at, 'YYYY/MM/DD HH:mm:ss')
  }

  get snapshot () {
    const data = this.$route.query.data as any
    if (!data) { return '' }
    return JSON.parse(decodeURIComponent(data))
  }

  get type () {
    if (!this.snapshot) { return '' }
    const type = this.snapshot.type
    const valid = this.validType.includes(type)
    return valid ? this.$t(`common.snapshot.type.${type}`) : this.$t('common.snapshot.type.INVALID')
  }

  get hash () {
    if (!this.snapshot) { return '' }
    return this.snapshot.transaction_hash
  }

  get sender () {
    if (!this.snapshot) { return '' }
    return this.snapshot.sender
  }

  async mounted () {
    this.loading = true
    await this.requestDetail(this.id)
    await this.loadUser(this.detail.opponent_id)
    this.loading = false
  }

  async requestDetail (id) {
    try {
      const detail = await getSnapshot(id)
      this.detail = detail
    } catch (error) {
      this.$errorHandler(this.$toast.bind(this), error)
    }
  }

  back () {
    this.$router.back()
  }
}
export default TransactionPage
</script>

<style lang="scss" scoped>
.transaction-page {
  margin: 20px 30px;

  .amount-info {
    font-size: 20px;
    font-weight: 600;

    .amount-text {
      font-family: DIN Alternate;
    }
  }

  .amount-usd {
    font-family: SF Compact Display Medium;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    text-align: center;
  }
}
</style>
