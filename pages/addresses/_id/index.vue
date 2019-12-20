<template>
  <normal-page-layout :has-back="true" @back="back">
    <template #title>
      {{ $t('page.addresses.title') }}
    </template>
    <div class="address-page">
      <v-skeleton-loader :loading="loading" type="article">
        <v-card class="px-5">
          <div>
            <div
              v-for="(address, index) in addresses"
              :key="index"
            >
              <address-item :asset-id="id" :address="address" @refresh="handleRefresh" />
            </div>
            <div @click="handleCreateAddress">
              <div class="f-field-item column create-address">
                <div class="f-field-value">
                  <v-icon large class="mr-2">
                    $vuetify.icons.iconAddOutline
                  </v-icon>
                  {{ $t('page.addresses.btn.new-address') }}
                </div>
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
import { Getter } from 'vuex-class'
import { getAssetAddresses } from '@/services/api/mixin'
import AddressItem from '@/components/partial/address/AddressItem.vue'

@Component({
  head () {
    return {
      title: this.title
    }
  },
  components: {
    AddressItem
  }
})
class Addresses extends Vue {
  @Getter('mixin-wallet/getAssetById') getAssetById

  addresses = []

  loading = false

  get title () {
    return this.$t('document.addresses.title')
  }

  get id () {
    return this.$route.params.id as string
  }

  get asset () {
    return this.getAssetById(this.id)
  }

  mounted () {
    this.init()
  }

  async init () {
    this.loading = true
    await this.requestAddresses()
    this.loading = false
  }

  handleCreateAddress () {
    this.$routerPush({ name: 'addresses-id-create', params: { id: this.id } })
  }

  handleRefresh () {
    this.init()
  }

  async requestAddresses () {
    try {
      const addresses = await getAssetAddresses(this.id)
      this.addresses = addresses
    } catch (error) {
      this.$errorHandler(this.$toast.bind(this), error)
    }
  }

  back () {
    this.$routerPush({ name: 'snapshots-id', params: { id: this.id } })
  }
}
export default Addresses
</script>
<style lang="scss" scoped>
.address-page {
  margin: 20px 30px;

  .create-address {
    border-bottom: none;
  }
}
</style>
