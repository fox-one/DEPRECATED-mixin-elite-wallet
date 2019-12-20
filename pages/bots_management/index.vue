<template>
  <normal-page-layout :has-back="true" @back="handleBack">
    <template #title>
      {{ $t('page.bot-management.title') }}
    </template>
    <div class="bots-management-page">
      <div class="mx-5">
        <v-text-field
          v-model="filter"
          class="bot-filter"
          hide-details
          dense
          clearable
          rounded
          solo
          flat
          background-color="#EEEEEE"
          :placeholder="$t('page.bot-management.placehoder.search')"
        />
      </div>
      <div class="group-tabs">
        <slider-tabs
          v-show="!filter"
          :value.sync="group"
          hide-slider
          show-arrows
          height="38"
          background-color="transparent"
        >
          <template #tabs>
            <v-tab
              v-for="(group, index) in groups"
              :key="index"
              :data-value="index"
              :ripple="false"
              class="group-tab"
            >
              {{ group }}
            </v-tab>
          </template>
        </slider-tabs>
        <slider-tabs
          v-if="filter"
          :value="0"
          hide-slider
          show-arrows
          height="38"
          background-color="transparent"
        >
          <template #tabs>
            <v-tab :ripple="false" class="group-tab" :data-value="0">
              {{ $t('common.search') }}
            </v-tab>
          </template>
        </slider-tabs>
      </div>
      <div class="bots">
        <bot-manage-item v-for="(item, index) in bots" :key="index" :bot="item" />
      </div>
    </div>
  </normal-page-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BotManageItem from '@/components/partial/bots/BotManageItem.vue'
import BOTS_CN from '@/static/bots-cn.json'
import BOTS_EN from '@/static/bots-en.json'

@Component({
  head () {
    return {
      title: this.title
    }
  },
  components: {
    BotManageItem
  }
})
class BotDetailPage extends Vue {
  filter = ''

  group = 0

  get title () {
    return this.$t('document.bot-management.title')
  }

  get botsData () {
    const data = this.$i18n.locale === 'en' ? BOTS_EN : BOTS_CN
    return data
  }

  get allBots () {
    const all = this.botsData.reduce((all, group) => {
      for (const bot of group.bots) {
        if (all.findIndex(b => b.identity_number === bot.identity_number) > -1) {
          continue
        }
        all.push(bot)
      }
      console.log(all)
      return all
    }, [] as any[])
    return all
  }

  get groups () {
    return this.botsData.map(group => group.title)
  }

  get filterBots () {
    return this.allBots.filter((bot) => {
      const name = bot.name.toLowerCase()
      const tags = bot.tags.toLowerCase()
      const desc = bot.description.toLowerCase()
      const filter = (this.filter && this.filter.toLowerCase()) || ''
      return name.includes(filter) || tags.includes(filter) || desc.includes(filter)
    })
  }

  get bots () {
    if (!this.filter) {
      return this.botsData[this.group].bots
    }
    return this.filterBots
  }

  handleBack () {
    this.$router.back()
  }
}

export default BotDetailPage
</script>

<style lang="scss" scoped>
.bots-management-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  .bots {
    background: #FFFFFF;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 30px 10px;
  }

  .group-tabs {
    margin: 10px 20px;

    .group-tab {
      min-width: 72px;
      text-transform: capitalize;
      padding: 0 8px;
    }
  }
}
</style>
