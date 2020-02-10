<template>
  <v-bottom-sheet v-model="sheet">
    <template #activator="{ on }">
      <v-btn text v-on="on">
        {{ text }}
        <v-icon size="14" class="ml-2">
          {{ $icons.mdiSettings }}
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ $t('component.setting.color-style-title') }}
      </v-card-title>
      <v-list>
        <v-list-item
          v-for="(color, index) in colorItems"
          :key="index"
          @click="handleSelect(color)"
        >
          <v-list-item-title :class="[{ 'primary--text': color.active }]">
            {{ color.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { COLOR_STYLE } from '@/constants'

@Component
class ColorSelect extends Vue {
  sheet = false

  @State(state => state.app.setting) setting

  @Mutation('app/setSetting') setSetting

  get color () {
    return this.setting.colorStyle
  }

  set color (val) {
    this.setSetting({ ...this.setting, colorStyle: val })
  }

  get colorItems () {
    return [
      {
        value: COLOR_STYLE.GREEN_UP_RED_DOWN,
        text: this.$t('component.setting.color-style.green_up_red_down'),
        active: this.color === COLOR_STYLE.GREEN_UP_RED_DOWN
      },
      {
        value: COLOR_STYLE.GREEN_DOWN_RED_UP,
        text: this.$t('component.setting.color-style.green_down_red_up'),
        active: this.color === COLOR_STYLE.GREEN_DOWN_RED_UP
      }
    ]
  }

  get text () {
    const color = this.colorItems.find(c => c.value === this.color)
    return color && color.text
  }

  handleSelect (color) {
    this.color = color.value
    this.sheet = false
  }
}
export default ColorSelect
</script>
