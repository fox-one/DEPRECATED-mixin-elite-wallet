<template>
  <normal-page-layout :has-back="true" @back="back">
    <template #title>
      {{ pageTitle }}
    </template>
    <div class="create-address-page">
      <create-or-edit-form :asset-id="id" :asset="asset" />
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
class CreateAddressPage extends Vue {
  @Getter('mixin-wallet/getAssetById') getAssetById

  get title () {
    return this.$t('document.addresses-create.title')
  }

  get id () {
    return this.$route.params.id as string
  }

  get asset () {
    return this.getAssetById(this.id)
  }

  get pageTitle () {
    return this.$t('page.addresses-create.title')
  }

  back () {
    this.$router.back()
  }
}
export default CreateAddressPage
</script>
<style lang="scss" scoped>
.create-address-page {
  margin: 20px 30px;
}
</style>
