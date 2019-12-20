<template>
  <div v-if="user" class="user-logo">
    <template v-if="user.avatar_url">
      <div class="avatar-wrapper">
        <v-img width="38" height="38" :src="user.avatar_url" class="avatar" />
      </div>
    </template>
    <template v-else class="fallback-logo">
      <div class="avatar-wrapper fallback">
        <v-icon color="#fff">
          {{ $icons.mdiAccountOutline }}
        </v-icon>
      </div>
    </template>
  </div>
  <div v-else class="user-logo">
    <div class="avatar-wrapper fallback">
      <v-icon color="#fff">
        {{ icon }}
      </v-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
class MixinUserLogo extends Vue {
  @Prop() user

  @Prop() snapshot

  get icon () {
    if (!this.snapshot) { return this.$icons.mdiAccountOutline }
    const type = this.snapshot.type
    switch (type) {
      case 'deposit':
      case 'withdrawal':
      case 'rebate':
        return '$vuetify.icons.iconGlobal'
      case 'fee':
        return this.$icons.mdiHammer
    }
  }

  get char () {
    const name = this.user && this.user.full_name
    if (!name) { return }
    return name[0] || this.user.user_id[0]
  }
}
export default MixinUserLogo
</script>
<style lang="scss" scoped>
.user-logo {
  width: 40px;
  display: flex;
  align-items: center;

  .avatar-wrapper {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &.fallback {
      background: #828e98;
    }
  }
}
</style>
