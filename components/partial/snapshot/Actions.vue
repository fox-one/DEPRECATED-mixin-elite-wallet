<template>
  <div class="actions-wrapper">
    <v-scale-transition>
      <v-tabs
        v-show="!hide"
        v-scroll:#scroll-target="onScroll"
        dark
        hide-slider
        show-arrows
        class="opts"
        height="74"
        background-color="transparent"
      >
        <v-tab
          v-for="(action, index) in actions"
          :key="index"
          class="opt-item"
          :ripple="false"
          @click="handleActionClick(action)"
        >
          <div class="d-flex flex-column align-center">
            <v-card v-ripple light flat class="icon-wrapper">
              <v-icon :size="action.size" :color="action.color">
                {{ action.icon }}
              </v-icon>
            </v-card>
            <span class="opt-label">
              {{ action.label }}
            </span>
          </div>
        </v-tab>
      </v-tabs>
    </v-scale-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ATM_SUPPORT_ASSETS, OTC_SUPPORT_ASSETS } from '@/constants'

const events = {
  send: Symbol('send'),
  receive: Symbol('receive'),
  exchange: Symbol('exchange'),
  loan: Symbol('loan'),
  otc: Symbol('otc'),
  regularInvest: Symbol('regular-invest')
}

@Component
class Actions extends Vue {
  @Prop() asset

  offset = 0

  get baseActions () {
    return [
      {
        label: this.$t('component.snapshots.actions.label.send'),
        event: events.send,
        icon: this.$icons.mdiArrowUp,
        size: '26',
        color: '#F50000'
      },
      {
        label: this.$t('component.snapshots.actions.label.receive'),
        event: events.receive,
        icon: this.$icons.mdiArrowDown,
        size: '26',
        color: '#009621'
      }
    ]
  }

  get hide () {
    return this.offset > 100
  }

  get actions () {
    let actions: any = [...this.baseActions]
    const atmSupported = ATM_SUPPORT_ASSETS.findIndex(a => a === this.symbol) > -1
    const otcSupported = OTC_SUPPORT_ASSETS.findIndex(a => a === this.symbol) > -1
    if (atmSupported) {
      actions = [...actions, {
        label: this.$t('component.snapshots.actions.label.exchange'),
        event: events.exchange,
        icon: '$vuetify.icons.iconSwitch',
        size: '16'
      }]
    }
    if (otcSupported) {
      actions = [...actions, {
        label: this.$t('component.snapshots.actions.label.otc'),
        event: events.otc,
        icon: '$vuetify.icons.iconOTC',
        size: '48'
      }]
    }
    if (this.symbol === 'USDT') {
      actions = [
        ...actions,
        {
          label: this.$t('component.snapshots.actions.label.regular-invest'),
          event: events.regularInvest,
          icon: '$vuetify.icons.iconRegularInvest',
          size: '24'
        }
      ]
    }
    return actions
  }

  get symbol () {
    return (this.asset && this.asset.symbol) || ''
  }

  onScroll (e) {
    this.offset = e.target.scrollTop
  }

  handleActionClick (action) {
    switch (action.event) {
      case events.send:
        this.$emit('send')
        break
      case events.receive:
        this.$emit('receive')
        break
      case events.exchange:
        this.$emit('exchange')
        break
      case events.otc:
        this.$emit('otc')
        break
      case events.regularInvest:
        this.$emit('regularInvest')
        break
      case events.loan:
        this.$emit('loan')
        break
    }
  }
}
export default Actions
</script>
<style lang="scss" scoped>
.actions-wrapper {
  height: 110px;
}

.opts {
  padding: 18px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: SF Compact Display Thin;
  overflow: auto;

  .opt-item {
    opacity: 1!important;

    &::before {
      opacity: 0!important;
    }

    .icon-wrapper {
      width: 52px;
      height: 52px;
      background: #fff;
      border-radius: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 4px;
    }

    .opt-label {
      font-size: 12px;
      color: #fff;
      font-weight: lighter;
    }
  }
}
</style>
