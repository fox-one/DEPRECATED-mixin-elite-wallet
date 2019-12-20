<template>
  <v-skeleton-loader :loading="initing" type="article">
    <v-card class="pa-5 mb-5">
      <div class="mb-5 text-center">
        <mixin-asset-logo :size="64" :asset="asset" />
      </div>
      <v-form ref="form">
        <v-textarea
          v-model="label"
          auto-grow
          persistent-hint
          rows="1"
          class="mb-4"
          :label="$t('component.address.create-edit-form.label.label')"
          :hint="$t('component.address.create-edit-form.hint.label')"
          :rules="rules.label"
        />
        <v-textarea
          v-model="destination"
          auto-grow
          persistent-hint
          rows="1"
          :label="$t('component.address.create-edit-form.label.destination')"
          :hint="$t('component.address.create-edit-form.hint.destination', { symbol: assetSymbol })"
          class="mb-4"
          :rules="rules.destination"
        />
        <v-textarea
          v-if="hasMemo"
          v-model="tag"
          auto-grow
          persistent-hint
          rows="1"
          class="mb-4"
          :hint="$t('component.address.create-edit-form.hint.tag')"
          :label="$t('component.address.create-edit-form.label.tag')"
          :rules="rules.tag"
        />
        <div v-if="!hasMemo" class="caption secondary--text mt-5">
          {{ $t('component.address.create-edit-form.tip.add-tag-1') }}
          <a @click="toggleMemo">
            {{ $t('component.address.create-edit-form.tip.add-tag-2') }}
          </a>
        </div>
        <div v-else class="caption secondary--text">
          {{ $t('component.address.create-edit-form.tip.remove-tag-1') }}
          <a @click="toggleMemo">
            {{ $t('component.address.create-edit-form.tip.remove-tag-2') }}
          </a>
        </div>
      </v-form>
    </v-card>
    <v-btn
      block
      rounded
      depressed
      color="primary"
      class="text-capitalize"
      @click="handleSaveAddress"
    >
      {{ $t('component.address.create-edit-form.btn.save') }}
    </v-btn>
  </v-skeleton-loader>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getAddress } from '@/services/api/mixin'

@Component
class CreateOrEditForm extends Vue {
  @Prop() assetId!: string

  @Prop() addressId!: string

  @Prop() asset

  loading = false

  initing = false

  hasMemo = true

  destination = ''

  label = ''

  tag = ''

  get rules () {
    return {
      label: [v => !!v || this.$t('component.address.create-edit-form.errors.label-require')],
      destination: [v => !!v || this.$t('component.address.create-edit-form.errors.destination-require')],
      tag: [v => !!v || this.$t('component.address.create-edit-form.errors.tag-require')]
    }
  }

  get assetSymbol () {
    return (this.asset && this.asset.symbol) || ''
  }

  mounted () {
    this.init()
  }

  async init () {
    this.initing = true
    if (this.addressId) {
      await this.requestAddressInfo(this.addressId)
    }
    this.initing = false
  }

  handleSaveAddress () {
    const form: any = this.$refs.form
    const valid = form.validate()
    if (valid) {
      this.requestSaveAddress()
    }
  }

  requestSaveAddress () {
    let url = `mixin://address?destination=${this.destination}&label=${encodeURIComponent(this.label)}&asset=${this.assetId}`
    if (this.hasMemo) {
      url += `&tag=${this.tag}`
    }
    window.location.href = url
    this.$root.$emit(this.$rootEvents.PIN_ENTER, this.handleConfirm.bind(this), this.handleCancel.bind(this))
  }

  handleCancel () {
    this.loading = false
  }

  handleConfirm () {
    this.toAddresses()
  }

  toggleMemo () {
    this.hasMemo = !this.hasMemo
    this.tag = ''
  }

  async requestAddressInfo (id) {
    try {
      const res = await getAddress(id)
      this.destination = res.destination
      this.label = res.label
      this.tag = res.tag
      this.hasMemo = Boolean(res.tag)
    } catch (error) {
      this.$errorHandler(this.$toast.bind(this), error)
    }
  }

  toAddresses () {
    this.$routerPush({ name: 'addresses-id', params: { id: this.assetId } })
  }
}
export default CreateOrEditForm
</script>
