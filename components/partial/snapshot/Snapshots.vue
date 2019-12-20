<template>
  <div class="snapshots" :style="styles">
    <div class="s-title">
      {{ $t('component.snapshots.snapshots.title') }}
    </div>
    <div
      id="scroll-target"
      v-scroll:#scroll-target="onScroll"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="loading && !hasNext"
      infinite-scroll-distance="10"
      class="groups"
    >
      <div v-for="(group, key) in snapshotsGroup" :key="key" class="group-item">
        <div class="group-label">
          <template v-if="$dateUtil.isToday(key)">
            {{ $t('common.today') }}
          </template>
          <template v-else>
            {{ key }}
          </template>
        </div>
        <v-card light flat class="group-snapshots">
          <template v-for="(snapshot, index) in group">
            <external-item
              v-if="snapshot.display === 'external'"
              :key="index"
              :external="snapshot"
              :asset="asset"
              :last="index === group.length-1"
            />
            <snapshot-item
              v-else
              :key="index"
              :snapshot="snapshot"
              :asset="asset"
              :last="index === group.length-1"
            />
          </template>
        </v-card>
      </div>
      <v-card v-if="hasNext" class="group-item">
        <v-skeleton-loader :loading="loading" type="list-item-avatar" />
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action, Mutation, State } from 'vuex-class'
import SnapshotItem from '@/components/partial/snapshot/SnapshotItem.vue'
import ExternalItem from '@/components/partial/snapshot/ExternalItem.vue'

@Component({
  components: {
    SnapshotItem,
    ExternalItem
  }
})
class Snapshots extends Vue {
  @Prop() assetId

  @Prop() asset

  @State(state => state['mixin-snapshots'].hasNext) hasNext

  @Getter('mixin-snapshots/getGroupedSnapshots') snapshotsGroup

  @Mutation('mixin-snapshots/removeSnapshots') removeSnapshots

  @Mutation('mixin-snapshots/removeExternals') removeExternals

  @Action('mixin-snapshots/loadSnapshots') loadSnapshots

  @Action('mixin-snapshots/loadExternals') loadExternals

  loading = false

  offset = 0

  get expand () {
    return this.offset > 100
  }

  get styles () {
    const top = this.expand ? '126px' : '226px'
    return [{ height: `calc(100% - ${top})` }]
  }

  onScroll (e) {
    this.offset = e.target.scrollTop
  }

  async loadMore () {
    this.loading = true
    await this.requestLoadSnapshots()
    await this.requestLoadloadExternals()
    this.loading = false
  }

  async requestLoadSnapshots () {
    try {
      await this.loadSnapshots(this.assetId)
    } catch (error) {}
  }

  async requestLoadloadExternals () {
    try {
      const params = { destination: this.asset.destination, tag: this.asset.tag, asset: this.asset.asset_id }
      await this.loadExternals(params)
    } catch (error) {}
  }

  beforeDestroy () {
    this.removeSnapshots()
    this.removeExternals()
  }
}
export default Snapshots
</script>

<style lang="scss" scoped>
.snapshots {
  background: #fff;
  color: #000;
  border-radius: 30px 30px 0px 0px;
  position: absolute;
  width: 100%;
  bottom: 0;
  transition: height 0.4s ease;

  .s-title {
    font-size: 18px;
    font-weight: 600;
    margin: 20px 30px;
  }

  .groups {
    padding: 0 30px;
    overflow: auto;
    height: calc(100% - 87px);
  }

  .group-item {
    margin: 16px 0;

    .group-label {
      color: rgba(0, 61, 105, 0.5);
      font-size: 14px;
      margin-bottom: 10px;
    }

    .group-snapshots {
      background: #fff;
      box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.05);
      border-radius: 7px;
      overflow: hidden;
    }
  }
}
</style>
