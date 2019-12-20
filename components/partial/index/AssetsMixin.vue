<template>
  <div v-if="inited" class="assets-wrapper">
    <div v-if="logged">
      <slot />
    </div>
    <v-card v-else flat class="connect-card">
      <div class="title">
        {{ $t('component.assets-mixin.connect-title') }}
      </div>
      <div class="mt-2 body-2">
        {{ $t('component.assets-mixin.connect-subtitle') }}
      </div>
      <v-btn
        rounded
        outlined
        block
        color="primary"
        class="mt-5"
        @click="handleConnect"
      >
        {{ $t('component.assets-mixin.connect-btn') }}
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, ProvideReactive } from 'vue-property-decorator'
import { Getter, State } from 'vuex-class'

export const AssetsKey = Symbol('mixin-assets')

@Component
class AssetsMixin extends Vue {
  @Getter('mixin-profile/logged') logged

  @State(state => state['mixin-wallet'].assets) mixinAssets

  @State(state => state.app.inited) inited

  @ProvideReactive(AssetsKey)
  get assets () {
    return this.mixinAssets
  }

  handleConnect () {
    this.$emit('login', 'mixin')
  }
}
export default AssetsMixin
</script>
<style lang="scss" scoped>
.assets-wrapper {
  margin-bottom: 68px;

  .connect-card {
    margin: 0 30px;
    padding: 24px 20px;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
