<template>
  <normal-page-layout>
    <template #title>
      {{ $t('page.index.title') }}
    </template>
    <div class="index-page">
      <balance-mixin>
        <balance-card @detail="handleToDetail" @login="handleLogin" />
      </balance-mixin>
      <assets-mixin @login="handleLogin">
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
    AssetsMixin
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
</style>
