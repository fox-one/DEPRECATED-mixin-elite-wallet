<template>
  <v-app>
    <nuxt />
    <v-snackbar v-model="snackbar" :color="bindSnackbar.color" :timeout="3000" top>
      {{ bindSnackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'

@Component
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
    if (navigator.language.includes('zh')) {
      this.changeLocale('zh')
    }
  }

  changeLocale (locale) {
    this.$i18n.setLocaleCookie(locale)
    this.$router.replace(this.switchLocalePath(locale))
  }
}
export default DefaultLayout
</script>

<style lang="scss">
</style>
