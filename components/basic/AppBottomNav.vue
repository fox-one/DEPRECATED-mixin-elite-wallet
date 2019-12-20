<template>
  <v-bottom-navigation
    v-if="layout.bottomNav"
    fixed
    grow
    app
    color="accent"
    class="elevation-0"
    :value="activeBottomNav"
  >
    <v-btn
      v-for="(nav, index) in bottomNavsItems"
      :key="index"
      :ripple="false"
      class="nav-btn"
      :class="[{ active: activeBottomNav === index }]"
      @click="handleNavClick(nav)"
    >
      <span>
        {{ nav.text }}
      </span>
      <v-icon :type="activeBottomNav === index ? '' : 'disabled'">
        {{ `$vuetify.icons.${nav.icon}` }}
      </v-icon>
      <span class="active-dot-wrapper animated rubberBand">
        <span class="active-dot" />
      </span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
class AppBottomNav extends Vue {
  @State(state => state.app.layout) layout

  get bottomNavsItems () {
    return [
      {
        text: this.$t('component.app-bottom-nav.label.wallet'),
        icon: 'iconWallet',
        path: 'index',
        activePaths: ['index', 'snapshots', 'snapshots-id']
      },
      {
        text: this.$t('component.app-bottom-nav.label.discover'),
        icon: 'iconDiscover',
        path: 'discover',
        activePaths: ['discover']
      }
    ]
  }

  get activeBottomNav () {
    const name = this.getRouteBaseName(this.$route)
    const navs = this.bottomNavsItems
    for (let i = 0; i < navs.length; i++) {
      if (navs[i].activePaths.includes(name)) {
        return i
      }
    }
    return -1
  }

  handleNavClick (nav) {
    this.$routerPush({ name: nav.path })
  }
}
export default AppBottomNav
</script>
<style lang="scss" scoped>
.nav-btn {
  position: relative;

  &:not(.active) {
    .active-dot-wrapper {
      display: none;
    }
  }

  .active-dot-wrapper {
    position: absolute;
    z-index: 11;
    top: -9px;
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 9px;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;

    .active-dot {
      width: 12px;
      height: 12px;
      border-radius: 6px;
      background: linear-gradient(180deg, #0596FF 0%, #1FA0FE 100%);
    }
  }
}
</style>
<style lang="scss" scoped>
.nav-btn.v-btn.v-btn--active:before {
  opacity: 0!important;
}
</style>
