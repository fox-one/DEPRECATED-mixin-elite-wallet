<template>
  <div>
    FoxoneAuthCallback
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  head () {
    return {
      title: this.title
    }
  },
  layout: 'auth-callback'
})
class FoxoneAuthCallback extends Vue {
  get title () {
    return this.$t('document.callback-foxone.title')
  }
}
export default FoxoneAuthCallback
</script>
