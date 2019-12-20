<template>
  <div class="f-field-item column address-wrapper">
    <div
      v-touch="{ left: handleSwipeLeft, right: handleSwipeRight }"
      class="address-content"
      :class="[{ 'offset': showActions }]"
      @click="handleAddressClick(address)"
    >
      <div class="f-field-label">
        {{ address.label }}
      </div>
      <div class="f-field-value">
        <span>{{ address.destination }}</span>
        <span v-if="address.tag">: {{ address.tag }}</span>
      </div>
    </div>
    <div class="address-actions">
      <v-btn
        small
        rounded
        outlined
        color="error"
        class="mr-2"
        @click="handleDeleteAddress"
      >
        {{ $t('common.delete') }}
      </v-btn>
      <v-btn
        small
        rounded
        outlined
        color="primary"
        @click="handleEditAddress"
      >
        {{ $t('common.edit') }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
class AddressItem extends Vue {
  @Prop() address

  @Prop() assetId

  showActions = false

  handleSwipeLeft () {
    this.showActions = true
  }

  handleSwipeRight () {
    this.showActions = false
  }

  handleAddressClick (address) {
    this.$routerPush({ name: 'withdraw', query: { addressId: address.address_id, assetId: this.assetId } })
  }

  handleDeleteAddress () {
    const url = `mixin://address?action=delete&address=${this.address.address_id}&asset=${this.assetId}`
    window.location.href = url
    this.$root.$emit(this.$rootEvents.PIN_ENTER, () => {
      this.$emit('refresh')
    })
  }

  handleEditAddress () {
    this.$routerPush({
      name: 'addresses-id-edit',
      params: { id: this.assetId },
      query: { addressId: this.address.address_id }
    })
  }
}
export default AddressItem
</script>
<style lang="scss" scoped>
.address-wrapper {
  position: relative;
  overflow: hidden;
  z-index: 1;
  background: #fff;
  padding: 0!important;

  .address-content {
    padding: 15px 0;
    position: relative;
    background: #fff;
    transition: transform ease-in-out 0.2s;

    &.offset {
      transform: translateX(-160px);
    }
  }

  .address-actions {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: -1;
  }
}
</style>
