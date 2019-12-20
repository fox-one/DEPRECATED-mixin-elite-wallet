<template>
  <auth-callback :token-function="tokenFunction" :login-function="loginFunction" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getAccessToken, login } from '@/services/api/mixin'

@Component({
  head () {
    return {
      title: this.title
    }
  },
  layout: 'auth-callback'
})
class MixinAuthCallback extends Vue {
  tokenFunction = getAccessToken

  loginFunction = login

  get title () {
    return this.$t('document.callback-mixin.title')
  }
}
export default MixinAuthCallback
</script>
