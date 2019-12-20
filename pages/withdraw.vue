<template>
  <normal-page-layout :has-back="true" @back="back">
    <template #title>
      {{ $t('page.withdraw.title', { name: assetSymbol }) }}
    </template>
    <div class="withdraw-page">
      <v-skeleton-loader :loading="initing" type="article">
        <v-card class="pa-5 mb-5">
          <div class="mb-5 text-center">
            <mixin-asset-logo :size="64" :asset="asset" />
          </div>
          <div class="f-field-item column address">
            <div class="f-field-label">
              {{ addressLabel }}
            </div>
            <div class="f-field-value">
              {{ addressValue }}
            </div>
          </div>
          <v-form ref="form">
            <v-text-field
              ref="amountInput"
              v-model="bindAmount"
              auto-grow
              persistent-hint
              rows="1"
              class="mb-4"
              type="number"
              aria-autocomplete="off"
              :label="$t('page.withdraw.label.amount')"
              :suffix="assetSymbol"
              :hint="amountHint"
              :rules="rules.amount"
            />
            <v-text-field
              v-model="memo"
              auto-grow
              persistent-hint
              rows="1"
              :label="$t('page.withdraw.label.memo')"
              class="mb-4"
            />
          </v-form>
        </v-card>
        <v-btn block rounded depressed color="primary" @click="handleSend">
          {{ $t('page.withdraw.send-btn') }}
        </v-btn>
        <p class="text-center caption secondary--text mt-5">
          {{ $t('page.withdraw.send-fee', { fee, feeAssetSymbol, assetSymbol }) }}
        </p>
      </v-skeleton-loader>
    </div>
  </normal-page-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { getAddress } from '@/services/api/mixin'

@Component({
  head () {
    return {
      title: this.title
    }
  }
})
class WithdrawPage extends Vue {
  @Getter('mixin-wallet/getAssetById') getAssetById

  initing = true

  address: any = {}

  destination = ''

  label = ''

  tag = ''

  amount = ''

  memo = ''

  get title () {
    return this.$t('document.withdraw.title')
  }

  get bindAmount () {
    return this.amount
  }

  set bindAmount (val) {
    const precision = this.amountPrecision
    this.amount = this.$numUtil.toPrecision(val, precision)
    const amountInput: any = this.$refs.amountInput
    amountInput.lazyValue = this.amount
  }

  get id () {
    return this.$route.query.assetId as string
  }

  get addressId () {
    return this.$route.query.addressId as string
  }

  get asset () {
    return this.getAssetById(this.id)
  }

  get addressLabel () {
    return this.$t('page.withdraw.label.address', { name: this.label })
  }

  get addressValue () {
    const destination = this.destination
    return this.tag ? `${destination}:${this.tag}` : destination
  }

  get assetSymbol () {
    return (this.asset && this.asset.symbol) || ''
  }

  get rules () {
    const max = Number(this.balance)
    const amountHint = this.amountHint
    return {
      amount: [
        v => !!v || this.$t('page.withdraw.errors.amount-require'),
        v => (!isNaN(Number(v)) && Number(v) > 0) || this.$t('page.withdraw.errors.amount-invalid'),
        v => Number(v) <= max || amountHint
      ]
    }
  }

  get balance () {
    return (this.asset && this.asset.balance) || ''
  }

  get amountHint () {
    return this.balance ? this.$t('page.withdraw.hint.amount', { balance: this.balance }) : ''
  }

  get amountPrecision () {
    if (!this.balance) { return 0 }
    return this.$numUtil.getPrecision(this.balance)
  }

  get fee () {
    return (this.address && this.address.fee) || ''
  }

  get feeAsset () {
    if (!this.asset) { return }
    const id = (this.asset && this.asset.chain_id)
    return this.getAssetById(id)
  }

  get feeAssetSymbol () {
    return (this.feeAsset && this.feeAsset.symbol) || ''
  }

  mounted () {
    this.init()
  }

  async init () {
    this.initing = true
    if (this.addressId) {
      await this.requestAddressInfo(this.addressId)
    }
    this.initing = false
  }

  handleSend () {
    const form = this.$refs.form as any
    const valid = form.validate()
    if (valid) {
      this.withdraw()
    }
  }

  async requestAddressInfo (id) {
    try {
      const res = await getAddress(id)
      this.destination = res.destination
      this.label = res.label
      this.tag = res.tag
      this.address = res
    } catch (error) {
      this.$errorHandler(this.$toast.bind(this), error)
    }
  }

  withdraw () {
    const uuid = require('uuid/v4')()
    const withdrawUrl = `mixin://withdrawal?address=${this.addressId}&asset=${this.id}&amount=${this.amount}&memo=${encodeURIComponent(this.memo)}&trace=${uuid}`
    window.location.href = withdrawUrl
    this.$root.$emit(this.$rootEvents.PIN_ENTER, () => {
      this.toAddresses()
    })
  }

  toAddresses () {
    this.$routerPush({ name: 'snapshots-id', params: { id: this.id } })
  }

  back () {
    this.$router.back()
  }
}
export default WithdrawPage
</script>
<style lang="scss" scoped>
.withdraw-page {
  margin: 20px 30px;

  .address {
    border-bottom: none;
  }
}
</style>
