<template>
  <normal-page-layout>
    <template #title>
      {{ $t('page.discover.title') }}
    </template>
    <div class="discover-page">
      <div class="filter">
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
          :placeholder="$t('page.discover.placehoder.search')"
        />
        <v-icon size="18" @click="openManagerment">
          $vuetify.icons.iconAdd
        </v-icon>
      </div>
      <div class="bots">
        <v-row cols="12">
          <v-col
            v-for="(bot, index) in filterBots"
            :key="index"
            class="pa-3"
            cols="3"
          >
            <bot-button
              :icon="bot.icon_url"
              :name="bot.name"
              @click.native="handleOpenBot(bot)"
            />
          </v-col>
        </v-row>
      </div>
    </div>
  </normal-page-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import BotButton from '@/components/partial/bots/BotButton.vue'
import BOTS_CN from '@/static/bots-cn.json'
import BOTS_EN from '@/static/bots-en.json'

@Component({
  head () {
    return {
      title: this.title
    }
  },
  components: {
    BotButton
  }
})
class DiscoverPage extends Vue {
  @State(state => state.bots.bots) bots;

  filter = '';

  get title () {
    return this.$t('document.discover.title')
  }

  get botsData () {
    const data = this.$i18n.locale === 'en' ? BOTS_EN : BOTS_CN
    return data
  }

  get botItems () {
    const all = this.botsData.reduce((all, group) => {
      for (const bot of group.bots) {
        if (all.findIndex(b => b.identity_number === bot.identity_number) > -1) {
          continue
        }
        all.push(bot)
      }
      return all
    }, [] as any[])
    return all.filter(bot => this.bots.includes(bot.identity_number))
  }

  get filterBots () {
    return this.botItems.filter((bot) => {
      const name = bot.name.toLowerCase()
      const tags = bot.tags.toLowerCase()
      const desc = bot.description.toLowerCase()
      const filter = (this.filter && this.filter.toLowerCase()) || ''
      return name.includes(filter) || tags.includes(filter) || desc.includes(filter)
    })
  }

  handleOpenBot (bot) {
    window.location.href = bot.url
  }

  openManagerment () {
    this.$routerPush({ name: 'bots_management' })
  }
}
export default DiscoverPage
</script>
<style lang="scss" scoped>
.discover-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  .filter {
    display: flex;
    align-items: center;
    padding: 0 20px;

    .bot-filter {
      color: rgba(0, 0, 0, 0.5);
      margin-right: 15px;
    }
  }

  .bots {
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    padding: 20px;
    padding-bottom: 68px;
  }
}
</style>
