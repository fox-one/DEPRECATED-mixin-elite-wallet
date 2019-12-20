<template>
  <v-tabs ref="tabs" v-model="bindValue" class="slider-tabs" v-bind="$attrs" v-on="$listeners">
    <slot name="tabs" />
    <div ref="slider" class="tab-slider primary" />
  </v-tabs>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Watch } from 'vue-property-decorator'

@Component
class SliderTabs extends Vue {
  @PropSync('value') bindValue

  @Watch('bindValue')
  handleValueChange () {
    this.setSliderPosition()
  }

  setSliderPosition () {
    this.$nextTick(() => {
      const tabs: any = this.$refs.tabs
      const slider: any = this.$refs.slider
      if (!tabs || !slider) { return }
      const activeTab = tabs.$el.querySelector(`.v-tab[data-value="${this.bindValue}"]`)
      console.log(activeTab)
      if (!activeTab) {
        slider.style.display = 'none'
        return
      }
      const left = activeTab.offsetLeft
      const width = activeTab.clientWidth
      const sliderWidth = width * 0.4
      const sliderLeft = (left + (width - sliderWidth) / 2).toFixed()
      slider.style.left = `${sliderLeft}px`
      slider.style.width = `${sliderWidth}px`
      console.log(left, width, sliderLeft, sliderWidth)
    })
  }

  mounted () {
    this.setSliderPosition()
  }
}
export default SliderTabs
</script>
<style lang="scss" scoped>
.slider-tabs {
  .tab-slider {
    position: absolute;
    transition: left 0.2s ease, width 0.2s ease;
    width: 20px;
    height: 4px;
    border-radius: 2px;
    bottom: 0;
  }
}
</style>

<style lang="scss">
.slider-tabs {
  .v-slide-group__next, .v-slide-group__prev {
    min-width: 32px;
    flex: 0 1 32px;
  }
}
</style>
