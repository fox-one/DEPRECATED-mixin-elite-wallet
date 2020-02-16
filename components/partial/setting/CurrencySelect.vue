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
        {{ $t('component.setting.currency-title') }}
      </v-card-title>
      <v-list>
        <v-list-item
          v-for="(currency, index) in currencyItems"
          :key="index"
          @click="handleSelect(currency)"
        >
          <v-list-item-title :class="[{ 'primary--text': currency.active }]">
            {{ currency.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

@Component
class CurrencySelect extends Vue {
  @State(state => state.app.setting) setting

  @Mutation('app/setSetting') setSetting

  sheet = false

  get currency () {
    return this.setting.currency
  }

  set currency (val) {
    this.setSetting({ ...this.setting, currency: val })
  }

  get text () {
    return this.$t(`component.setting.currency.${this.currency}`)
  }

  get currencyItems () {
    return [
      {
        value: 'usd',
        text: this.$t('component.setting.currency.usd'),
        active: this.currency === 'usd'
      },
      {
        value: 'cny',
        text: this.$t('component.setting.currency.cny'),
        active: this.currency === 'cny'
      }
    ]
  }

  handleSelect (currency) {
    this.currency = currency.value
    this.sheet = false
  }
}
export default CurrencySelect
</script>
