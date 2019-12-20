<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>
        {{ $t('component.ping-confirm-dialog.title') }}
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="handleCancel">
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn text color="primary" @click="handleConfirm">
          {{ $t('common.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
class PinConfirmDialog extends Vue {
  dialog = false

  onConfirm: Function | null = null

  onCancel: Function | null = null

  mounted () {
    this.$root.$on(this.$rootEvents.PIN_ENTER, (onConfirm = null, onCancel = null) => {
      this.onConfirm = onConfirm
      this.onCancel = onCancel
      setTimeout(() => {
        this.dialog = true
      }, 1000)
    })
  }

  handleCancel () {
    this.dialog = false
    if (this.onCancel) {
      this.onCancel()
    }
  }

  handleConfirm () {
    this.dialog = false
    if (this.onConfirm) {
      this.onConfirm()
    }
  }
}
export default PinConfirmDialog
</script>
