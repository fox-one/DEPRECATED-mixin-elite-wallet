<template>
  <div class="snapshot" @click="handleSnapshotClick">
    <mixin-user-logo :user="user" :snapshot="snapshot" />
    <div class="content">
      <div class="name">
        {{ type }}
      </div>
      <div class="amount">
        <span class="amount-number" :style="[{ color: amountColor }]">
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
import { Getter, Action } from 'vuex-class'
import MixinUserLogo from '@/components/partial/snapshot/MixinUserLogo.vue'

@Component({
  components: {
    MixinUserLogo
  }
})
class SnapshotItem extends Vue {
  @Getter('mixin-users/getUserById') getUserById

  @Action('mixin-users/loadUser') loadUser

  @Prop() snapshot

  @Prop() asset

  @Prop() last

  validType = ['transfer', 'deposit', 'withdrawal', 'fee', 'rebate']

  get user () {
    return this.getUserById(this.snapshot.opponent_id)
  }

  get amountText () {
    const amount = this.snapshot.amount
    const value = Number(amount)
    return value > 0 ? `+${amount}` : amount
  }

  get symbol () {
    return (this.asset && this.asset.symbol) || '-'
  }

  get type () {
    if (!this.snapshot) { return '-' }
    const type = this.snapshot.type
    const valid = this.validType.includes(type)
    return valid ? this.$t(`common.snapshot.type.${type}`) : this.$t('common.snapshot.type.INVALID')
  }

  get amountColor () {
    const value = Number(this.snapshot.amount)
    return value > 0 ? this.$colors.green : this.$colors.red
  }

  get hasReceiver () {
    return this.snapshot.receiver
  }

  mounted () {
    this.loadUser(this.snapshot.opponent_id)
  }

  handleSnapshotClick () {
    this.$routerPush({
      name: 'transaction-id',
      params: { id: this.snapshot.snapshot_id },
      query: { data: encodeURIComponent(JSON.stringify(this.snapshot)) }
    })
  }
}
export default SnapshotItem
</script>

<style lang="scss" scoped>
.snapshot {
  display: flex;
  padding: 0 15px;
  overflow: hidden;

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
    }

    .amount-symbol {
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>
