<template>
  <div class="bot-management-item" @click="handleToDetail">
    <div class="mr-5">
      <v-img height="48" width="48" class="icon" :src="bot.icon_url" />
    </div>
    <div class="d-flex flex-column flex-fill">
      <div class="d-flex align-center bot-header">
        <div class="flex-fill bot-title mr-4">
          {{ bot.name }}
        </div>
        <div @click.stop>
          <v-btn
            v-if="!added"
            depressed
            small
            rounded
            color="primary"
            width="86"
            @click.stop.prevent="toggleBot(bot.identity_number)"
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
            width="86"
            @click.stop.prevent="toggleBot(bot.identity_number)"
          >
            {{ $t('common.delete') }}
          </v-btn>
        </div>
      </div>
      <div class="bot-subtitle">
        {{ bot.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

@Component
class BotManageItem extends Vue {
  @Prop() bot

  @State(state => state.bots.bots) bots

  @Mutation('bots/toggleBot') toggleBot

  get added () {
    return this.bots.includes(this.bot.identity_number)
  }

  handleToDetail () {
    this.$routerPush({ name: 'bot_detail-id', params: { id: this.bot.identity_number } })
  }
}

export default BotManageItem
</script>

<style lang="scss" scoped>
.bot-management-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 61, 105, 0.08);

  &:last-child {
    border-bottom: none;
  }

  .bot-header {
    min-height: 40px;
    margin-bottom: 4px;
  }

  .bot-title {
    font-size: 16px;
    line-height: 22px;
  }

  .bot-subtitle {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    max-height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
