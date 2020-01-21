<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>{{ $t('component.require-auth-dialog.access-deny.title') }}</v-card-title>
      <v-card-text>{{ $t('component.require-auth-dialog.access-deny.text', { source }) }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn text color="primary" @click="handleAuth">
          {{ $t('common.re-auth') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { authLogin } from '@/utils/loginUtil'

@Component
class RequireAuthDialog extends Vue {
  dialog = false

  source = ''

  show (source) {
    this.source = source || ''
    this.dialog = true
  }

  handleAuth () {
    authLogin('mixin')
  }

  mounted () {
    this.$root.$on(this.$rootEvents.ASSETS_FORBIDDEN, (source) => {
      this.show(source)
    })
  }
}
export default RequireAuthDialog
</script>
