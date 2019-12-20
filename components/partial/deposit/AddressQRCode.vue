<template>
  <div class="address-code-wrapper">
    <qr-code :value="value" />
    <mixin-asset-logo :asset="asset" :size="32" class="asset-logo" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
class AddressQRCode extends Vue {
  @Prop() value!: string

  @Prop() asset
}
export default AddressQRCode
</script>
<style lang="scss" scoped>
.address-code-wrapper {
  position: relative;

  .asset-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 1px 3px #fff, inset 0px 0px 1px 3px #fff;
    border-radius: 18px;
    box-sizing: content-box;
  }
}
</style>
