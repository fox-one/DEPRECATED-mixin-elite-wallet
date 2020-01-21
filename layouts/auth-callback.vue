<template>
  <v-app>
    <nuxt />
    <v-snackbar v-model="snackbar" :color="bindSnackbar.color" :timeout="3000" top>
      {{ bindSnackbar.message }}
    </v-snackbar>
    <require-auth-dialog />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'

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
}
export default DefaultLayout
</script>

<style lang="scss">
</style>
