<template>
  <v-dialog v-model="dialog" fullscreen transition="slide-y-reverse-transition">
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>
          {{ $icons.mdiMagnify }}
        </v-icon>
      </v-btn>
    </template>
    <v-card class="search-modal">
      <div class="d-flex align-center pa-5">
        <v-text-field
          v-model="text"
          dense
          rounded
          solo
          hide-details
          flat
          background-color="rgb(238, 238, 238)"
          :placeholder="$t('common.search')"
          class="search-field"
        />
        <v-btn icon class="ml-2" @click="handleClose">
          <v-icon>
            {{ $icons.mdiClose }}
          </v-icon>
        </v-btn>
      </div>
      <assets-list :filter="text" class="assets" @detail="handleToDetail">
        <template #title>
          <div />
        </template>
      </assets-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AssetsList from '@/components/partial/index/AssetsList.vue'

@Component({
  name: 'assetSearch',
  components: {
    AssetsList
  }
})
class AssetSearch extends Vue {
  dialog = false

  text = ''

  handleClose () {
    this.text = ''
    this.dialog = false
  }

  handleToDetail (id) {
    this.handleClose()
    setTimeout(() => {
      this.$routerPush({ name: 'snapshots-id', params: { id } })
    }, 200)
  }
}
export default AssetSearch
</script>

<style lang="scss" scoped>
.search-modal {
  height: 100%;
  display: flex;
  flex-direction: column;

  .assets {
    flex: 1;
    overflow: auto;
  }
}
</style>
