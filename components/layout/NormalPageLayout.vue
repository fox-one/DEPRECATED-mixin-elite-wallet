<template>
  <div class="normal-page-layout">
    <slot name="app-bar">
      <v-app-bar app flat fixed color="#FFFFFF" class="page-nav">
        <v-btn v-if="hasBack" icon @click="$emit('back')">
          <v-icon color="#000000">
            {{ $icons.mdiArrowLeft }}
          </v-icon>
        </v-btn>
        <v-toolbar-title class="page-title pl-1">
          <slot name="title" />
        </v-toolbar-title>
      </v-app-bar>
    </slot>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
class NormalPageLayout extends Vue {
  @Prop() hasBack!: boolean
}
export default NormalPageLayout
</script>
<style lang="scss" scoped>
.page-nav {
  padding: 0 8px;

  .page-title {
    font-size: 22px;
    color: #000000;
  }
}

.normal-page-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 56px;
}
</style>
