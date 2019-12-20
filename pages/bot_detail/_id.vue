<template>
  <normal-page-layout :has-back="true" @back="handleBack">
    <template #title>
      {{ $t('page.bot-detail.title') }}
    </template>
    <v-card :ripple="false" class="detail-card" @click="handleToDetail">
      <div class="card-title">
        <div class="mr-4">
          <v-img height="60" width="60" :src="bot.icon_url" />
        </div>
        <div class="flex-fill">
          <div class="bot-title">
            {{ bot.name }}
          </div>
          <div class="py-2">
            <v-btn
              v-if="!added"
              depressed
              small
              rounded
              color="primary"
              width="86"
              @click.stop="toggleBot(bot.identity_number)"
            >
              {{ $t('common.add') }}
            </v-btn>
            <v-btn
              v-else
              depressed
              small
              rounded
              outlined
              color="error"
              @click.stop="toggleBot(bot.identity_number)"
            >
              {{ $t('common.delete') }}
            </v-btn>
          </div>
        </div>
      </div>
      <div class="bot-subtitle">
        {{ bot.description }}
      </div>
      <div class="f-field-item column">
        <div class="f-field-label">
          {{ $t('page.bot-detail.label.bot-id') }}
        </div>
        <div class="f-field-value">
          {{ bot.identity_number }}
        </div>
      </div>
      <div class="f-field-item column">
        <div class="f-field-label">
          {{ $t('page.bot-detail.label.category') }}
        </div>
        <div class="f-field-value">
          {{ bot.title }}
        </div>
      </div>
      <div v-if="bot.tags" class="f-field-item column">
        <div class="f-field-label">
          {{ $t('page.bot-detail.label.tag') }}
        </div>
        <div class="f-field-value">
          {{ bot.tags }}
        </div>
      </div>
    </v-card>
  </normal-page-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import BOTS_CN from '@/static/bots-cn.json'
import BOTS_EN from '@/static/bots-en.json'

@Component({
  head () {
    return {
      title: this.title
    }
  }
})
class BotDetailPage extends Vue {
  @State(state => state.bots.bots) bots

  @Mutation('bots/toggleBot') toggleBot

  get title () {
    return this.$t('document.bot-detail.title')
  }

  get id () {
    return this.$route.params.id
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
        all.push({ ...bot, title: group.title })
      }
      return all
    }, [] as any[])
    return all
  }

  get bot () {
    return this.botItems.find(bot => bot.identity_number === this.id)
  }

  get added () {
    return this.bots.includes(this.bot.identity_number)
  }

  handleToDetail () {
    window.location.href = this.bot.url
  }

  handleBack () {
    this.$router.back()
  }
}

export default BotDetailPage
</script>
<style lang="scss" scoped>
.detail-card {
  padding: 20px;
  margin: 20px;

  .card-title {
    display: flex;
    align-items: center;

    .bot-title {
      font-size: 20px;
    }
  }

  .bot-subtitle {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    padding: 10px 0;
  }
}
</style>
