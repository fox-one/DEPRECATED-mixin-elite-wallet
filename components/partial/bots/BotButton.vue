<template>
  <div class="bot-button">
    <v-spacer />
    <div class="d-flex justify-center">
      <span>
        <v-img class="icon" :src="icon" />
      </span>
    </div>
    <div class="name" :style="nameStyles">
      {{ name }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
class BotButton extends Vue {
  @Prop() icon

  @Prop() name

  get nameStyles () {
    const length = (this.name && this.name.length) || 0
    let styles: any = []
    if (length && length > 8) {
      styles = [...styles, { 'font-size': '12px' }]
    }
    return styles
  }
}

export default BotButton
</script>

<style lang="scss" scoped>
.bot-button {
  text-align: center;

  .icon {
    width: 48px;
    height: 48px;
    border-radius: 23px;
  }

  .name {
    margin-top: 8px;
    font-size: 13px;
    padding: 0 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
