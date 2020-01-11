<template>
  <v-app>
    <nuxt />
    <v-snackbar v-model="snackbar" :color="bindSnackbar.color" :timeout="1000" top style="top: 60px">
      {{ bindSnackbar.message }}
    </v-snackbar>
    <app-bottom-nav />
    <pin-confirm-dialog />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import { loadAccountInfo } from '@/utils/loginUtil'

@Component({
  middleware: 'i18n'
})
class DefaultLayout extends Vue {
  @State(state => state.app.snackbar) bindSnackbar

  @Mutation('app/setSnackbar') setSnackbar

  get snackbar () {
    return this.bindSnackbar.show
  }

  set snackbar (val) {
    this.setSnackbar(val)
  }

  mounted () {
    this.init()
  }

  init () {
    (window as any).onNuxtReady(() => {
      loadAccountInfo(this.$store)
    })
  }
}
export default DefaultLayout
</script>
