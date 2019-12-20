<template>
  <div class="external">
    <div class="processing-wrapper">
      <div class="processing">
        <v-progress-circular
          :rotate="-90"
          :value="process"
          :size="20"
          :width="2"
          color="primary"
        />
      </div>
    </div>
    <div class="content">
      <div class="name">
        {{ externalText }}
      </div>
      <div class="amount">
        <span class="amount-number">
          {{ amountText }}
        </span>
        <span class="amount-symbol">
          {{ symbol }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
class ExternalItem extends Vue {
  @Prop() external

  @Prop() asset

  get amountText () {
    const amount = this.external.amount
    const value = Number(amount)
    return value > 0 ? `+${amount}` : amount
  }

  get symbol () {
    return (this.asset && this.asset.symbol) || '-'
  }

  get externalText () {
    const confirmation = this.external.confirmations
    const threshold = this.external.threshold
    return this.$t('component.snapshots.external-item.confirmation-text', { number: `${confirmation}/${threshold}` })
  }

  get process () {
    const confirmation = this.external.confirmations
    const threshold = this.external.threshold
    return (confirmation / threshold * 100).toFixed()
  }
}
export default ExternalItem
</script>
<style lang="scss" scoped>
.external {
  display: flex;
  padding: 0 15px;
  overflow: hidden;

  .processing-wrapper {
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 8px;

    .processing {
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: #828e98;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &:last-child {
    .content {
      border-bottom: none;
    }
  }

  .content {
    flex: 1;
    display: flex;
    overflow: hidden;
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 61, 105, 0.08);

    .name {
      flex: 1;
      font-weight: 600;
      font-size: 14px;
      line-height: 25px;
      padding-right: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
    }

    .amount-number {
      font-family: DIN Alternate;
      font-weight: bold;
      opacity: 0.5;
    }

    .amount-symbol {
      font-size: 14px;
      font-weight: 600;
      opacity: 0.5
    }
  }
}
</style>
<style lang="scss">
.external .processing-wrapper .v-progress-circular__underlay {
  stroke: #fff;
}
</style>
