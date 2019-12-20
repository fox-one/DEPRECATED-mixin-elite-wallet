<template>
  <svg
    class="icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.5 16.5V20.695C22.5 21.245 22.06 22 21.5 22H1.5C0.950002 22 0.500002 21.245 0.500002 20.695V6.695C0.500002 6.14 0.950002 6 1.5 6H21.5C22.05 6 22.5 6.14 22.5 6.69V11.5" :fill="colors[0]" />
    <path d="M23.5 11.5H14.5V16.5H23.5V11.5Z" :fill="colors[1]" />
    <path d="M21.51 15.19C22.0623 15.19 22.51 14.7423 22.51 14.19C22.51 13.6377 22.0623 13.19 21.51 13.19C20.9577 13.19 20.51 13.6377 20.51 14.19C20.51 14.7423 20.9577 15.19 21.51 15.19Z" :fill="colors[2]" />
    <path d="M1.5 5.84499L16.435 2.02999C16.5556 1.98997 16.684 1.97888 16.8097 1.99764C16.9354 2.0164 17.0549 2.06447 17.1586 2.13797C17.2622 2.21147 17.3472 2.30834 17.4065 2.42074C17.4658 2.53314 17.4978 2.65792 17.5 2.78499V5.99999" :fill="colors[3]" />
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
class IconWallet extends Vue {
  @Prop() type

  get colors () {
    return this.type === 'disabled' ? ['#CCCCCC', '#EEEEEE', '#999999', '#999999'] : ['#67BFFF', '#BAE2FF', '#169CFE', '#169CFE']
  }
}
export default IconWallet
</script>
<style lang="scss" scoped>
.icon {
  fill: currentColor
}
</style>
