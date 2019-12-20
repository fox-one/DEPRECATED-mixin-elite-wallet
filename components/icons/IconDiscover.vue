<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 15.915C16.7211 15.2188 18.1464 13.9457 19.0317 12.3138C19.9171 10.682 20.2073 8.793 19.8527 6.97064C19.4981 5.14828 18.5206 3.506 17.088 2.32524C15.6553 1.14449 13.8565 0.498779 12 0.498779C10.1435 0.498779 8.34471 1.14449 6.91203 2.32524C5.47935 3.506 4.50194 5.14828 4.1473 6.97064C3.79267 8.793 4.0829 10.682 4.96825 12.3138C5.85359 13.9457 7.27894 15.2188 9 15.915" :fill="colors[0]" />
    <path d="M15 16V21.5H9V16" :fill="colors[1]" />
    <path d="M9 23.5H15" :stroke="colors[2]" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
class IconDiscover extends Vue {
   @Prop() type

   get colors () {
     return this.type === 'disabled' ? ['#CCCCCC', '#EEEEEE', '#999999'] : ['#67BFFF', '#BAE2FF', '#169CFE']
   }
}
export default IconDiscover
</script>
