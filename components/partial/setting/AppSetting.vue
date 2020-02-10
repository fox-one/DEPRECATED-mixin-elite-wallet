<template>
  <v-bottom-sheet v-model="sheet">
    <template #activator="{ on }">
      <v-btn icon small class="ma-0" v-on="on">
        <v-icon size="20">
          {{ $icons.mdiSettings }}
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ $t('common.setting') }}
      </v-card-title>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            {{ $t('component.setting.currency') }}
          </v-list-item-title>
          <v-list-item-action>
            <currency-select />
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            {{ $t('component.setting.color-style') }}
          </v-list-item-title>
          <v-list-item-action>
            <color-select />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CurrencySelect from '@/components/partial/setting/CurrencySelect.vue'
import ColorSelect from '@/components/partial/setting/ColorSelect.vue'

@Component({
  components: {
    CurrencySelect,
    ColorSelect
  }
})
class AppSetting extends Vue {
  sheet = false
}
export default AppSetting
</script>
