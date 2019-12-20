<template>
  <normal-page-layout :has-back="true" @back="back">
    <template #title>
      {{ pageTitle }}
    </template>
    <div class="edit-address-page">
      <create-or-edit-form :address-id="addressId" :asset-id="id" :asset="asset" />
    </div>
  </normal-page-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import CreateOrEditForm from '@/components/partial/address/CreateOrEditForm.vue'

@Component({
  head () {
    return {
      title: this.title
    }
  },
  components: {
    CreateOrEditForm
  }
})
class EditAddressPage extends Vue {
  @Getter('mixin-wallet/getAssetById') getAssetById

  get title () {
    return this.$t('document.addresses-edit.title')
  }

  get id () {
    return this.$route.params.id as string
  }

  get addressId () {
    return this.$route.query.addressId as string
  }

  get asset () {
    return this.getAssetById(this.id)
  }

  get pageTitle () {
    return this.$t('page.addresses-edit.title')
  }

  back () {
    this.$router.back()
  }
}
export default EditAddressPage
</script>

<style lang="scss" scoped>
.edit-address-page {
  margin: 20px 30px;
}
</style>
