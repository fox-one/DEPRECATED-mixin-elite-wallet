<template>
  <v-card
    v-if="meta"
    dark
    flat
    color="transparent"
    class="wallet-balance-card"
    :ripple="!meta.logged"
    :class="[`type-${meta.type}`]"
    @click="handleClick"
  >
    <v-img
      :aspect-ratio="272/152"
      :src="meta.background"
      max-height="182"
      class="card-image"
    >
      <div class="card-content ma-0">
        <div class="heading d-flex align-center">
          <v-icon size="29" class="mr-2">
            {{ meta.icon }}
          </v-icon>
          {{ meta.title }}
        </div>
        <div class="flex-fill d-flex flex-column justify-end balancing-wrapper">
          <v-skeleton-loader :loading="!inited" type="paragraph">
            <div v-if="meta.logged">
              <div class="balancing">
                ≈ {{ meta.totalBtc }} BTC
              </div>
              <div class="balancing-legal">
                ≈${{ meta.totalUsdt }}
              </div>
            </div>
            <div v-else class="disconnected">
              <div class="disconnected-title">
                {{ $t('component.balance-card.disconnect') }}
              </div>
              <div class="disconnected-subtitle">
                {{ $t('component.balance-card.tab-connect', { name: meta.name }) }}
              </div>
            </div>
          </v-skeleton-loader>
        </div>
      </div>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, InjectReactive } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { MetaKey } from '@/components/partial/index/BalanceMixin.vue'

@Component
class BalanceCard extends Vue {
  @InjectReactive(MetaKey) meta

  @State(state => state.app.inited) inited

  handleClick () {
    if (!this.meta.logged) {
      this.$emit('login', this.meta.type)
    }
  }
}
export default BalanceCard
</script>
<style lang="scss" scoped>
.wallet-balance-card {
  border-radius: 20px!important;
  overflow: hidden;
  box-shadow: 0px 2px 20px rgba(5, 150, 255, 0.5);
  background: #0596FF;
  margin: 23px 30px 20px;

  .card-image {
    background: #0596FF;
  }

  .card-content {
    padding: 30px 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .heading {
      font-size: 20px;
    }

    .balancing-wrapper {
      font-family: SF Compact Display Medium;

      .balancing {
        font-size: 28px;
        font-weight: bold;
      }

      .balancing-legal {
        opacity: 0.6;
      }

      .disconnected {
        .disconnected-title {
          font-size: 22px;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.6);
        }

        .disconnected-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }
  }
}
</style>
