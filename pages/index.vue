<template>
  <normal-page-layout>
    <template #title>
      <v-app-bar app flat fixed color="#FFFFFF" class="page-nav">
        <v-toolbar-title class="page-title pl-1">
          {{ $t('page.index.title') }}
        </v-toolbar-title>
      </v-app-bar>
    </template>
    <div class="index-page">
      <balance-mixin>
        <balance-card @detail="handleToDetail" @login="handleLogin" />
      </balance-mixin>
      <assets-mixin @login="handleLogin">
        <div class="assets-title">
          <div class="title">
            {{ $t('component.assets-list.title') }}
          </div>
          <div class="flex-fill text-right">
            <asset-search />
            <app-setting />
          </div>
        </div>
        <assets-list @detail="handleToDetail" />
      </assets-mixin>
    </div>
  </normal-page-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BalanceMixin from '@/components/partial/index/BalanceMixin.vue'
import BalanceCard from '@/components/partial/index/BalanceCard.vue'
import AssetsList from '@/components/partial/index/AssetsList.vue'
import AssetSearch from '@/components/partial/index/AssetSearch.vue'
import AssetsMixin from '@/components/partial/index/AssetsMixin.vue'
import { authLogin } from '@/utils/loginUtil'

@Component({
  head () {
    return {
      title: this.title
    }
  },
  components: {
    BalanceMixin,
    BalanceCard,
    AssetsList,
    AssetsMixin,
    AssetSearch
  }
})
class IndexPage extends Vue {
  get title () {
    return this.$t('document.index.title')
  }

  type = 'mixin'

  handleLogin (plat) {
    authLogin(plat)
  }

  handleToDetail (id) {
    this.$routerPush({ name: 'snapshots-id', params: { id } })
  }
}
export default IndexPage
</script>

<style lang="scss" scoped>
.index-page {
  height: 100%;
  overflow-y: auto;
}

.assets-title {
  margin: 0 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .search-field {
    display: inline-block;
    max-width: 180px;
  }
}
</style>
