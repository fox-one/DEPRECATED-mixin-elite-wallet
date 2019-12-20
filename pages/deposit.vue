<template>
  <normal-page-layout :has-back="true" @back="back">
    <template #title>
      {{ $t('page.deposit.title', { name: assetName }) }}
    </template>
    <div class="deposit-page">
      <v-card class="mb-5">
        <div class="address-item">
          <div class="address-info f-field-item column">
            <div class="f-field-label">
              {{ $t('page.deposit.label.address') }}
            </div>
            <div class="f-field-value flex-fill address-text">
              {{ destination }}
            </div>
            <div>
              <v-btn
                v-clipboard:copy="destination"
                v-clipboard:success="() => $copyUtil.onCopy(this)"
                v-clipboard:error="() => $copyUtil.onError(this)"
                small
                depressed
                rounded
                color="primary"
              >
                {{ $t('common.copy') }}
              </v-btn>
            </div>
          </div>
          <div v-if="destination" class="address-qrcode">
            <address-qr-code :value="destination" :asset="asset" />
          </div>
        </div>
        <div v-if="tag" class="address-item">
          <div class="address-info f-field-item column">
            <div class="f-field-label">
              {{ $t('page.deposit.label.tag') }}
            </div>
            <div class="f-field-value flex-fill address-text">
              {{ tag }}
            </div>
            <div>
              <v-btn
                v-clipboard:copy="tag"
                v-clipboard:success="() => $copyUtil.onCopy(this)"
                v-clipboard:error="() => $copyUtil.onError(this)"
                small
                depressed
                rounded
                color="primary"
              >
                {{ $t('common.copy') }}
              </v-btn>
            </div>
          </div>
          <div v-if="tag" class="address-qrcode">
            <address-qr-code :value="tag" :asset="asset" />
          </div>
        </div>
      </v-card>
      <p v-if="confirmations" class="caption secondary--text mb-1 text-confirm">
        {{ $t('page.deposit.tip.confirmation', { confirmations }) }}
        <v-icon size="16" color="accent" class="ml-1" @click="toHelp">
          {{ $icons.mdiHelpCircleOutline }}
        </v-icon>
      </p>
      <p class="caption text-center error--text">
        {{ $t('page.deposit.tip.try-little') }}
      </p>
    </div>
  </normal-page-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import AddressQRCode from '@/components/partial/deposit/AddressQRCode.vue'
import { MIXIN_DEPOSIT_HELP } from '@/constants'

@Component({
  head () {
    return {
      title: this.title
    }
  },
  components: {
    'address-qr-code': AddressQRCode
  }
})
class DepositPage extends Vue {
  @Getter('mixin-wallet/getAssetById') getAssetById

  get title () {
    return this.$t('document.deposit.title')
  }

  get id () {
    return this.$route.query.id as string
  }

  get asset () {
    return this.getAssetById(this.id)
  }

  get assetName () {
    return (this.asset && this.asset.symbol) || ''
  }

  get destination () {
    return (this.asset && this.asset.destination) || ''
  }

  get tag () {
    return (this.asset && this.asset.tag) || ''
  }

  get confirmations () {
    return (this.asset && this.asset.confirmations) || ''
  }

  toHelp () {
    const url = MIXIN_DEPOSIT_HELP[this.$i18n.locale]
    window.location.href = url
  }

  back () {
    this.$router.back()
  }
}
export default DepositPage
</script>
<style lang="scss" scoped>
.deposit-page {
  margin: 20px 30px;

  .address-item {
    padding: 20px;
    display: flex;
    border-bottom: 1px solid rgba(0, 61, 105, 0.08);

    &:last-child {
      border-bottom: none;
    }

    .address-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-bottom: none;
      margin-right: 20px;
      padding: 0;

      .address-text {
        word-break: break-all;
        padding: 10px 0 20px;
      }
    }

    .address-qrcode {
      display: flex;
      align-items: center;
    }
  }

  .text-confirm {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
