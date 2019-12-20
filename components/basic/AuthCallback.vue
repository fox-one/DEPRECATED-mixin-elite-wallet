<template>
  <div>
    <v-dialog v-model="error" max-width="800">
      <v-card>
        <v-card-title class="error--text">
          授权失败
        </v-card-title>
        <v-card-text>
          <p v-if="errorMsg">
            {{ errorMsg }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="toHome">
            返回首页
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <loading :loading="loading" :fullscreen="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { loadAccountInfo } from '@/utils/loginUtil'

@Component
class FoxoneAuthCallback extends Vue {
  @Prop() tokenFunction!: Function

  @Prop() loginFunction!: Function

  loading = false

  error = false

  errorMsg = ''

  get code () {
    return this.$route.query.code as string
  }

  mounted () {
    this.requestAccessToken()
  }

  async requestAccessToken () {
    this.loading = true
    try {
      const token = await this.tokenFunction(this.code)
      await this.loginFunction(token)
      loadAccountInfo(this.$store, this)
      this.toHome()
    } catch (error) {
      this.error = true
    } finally {
      this.loading = false
    }
  }

  toHome () {
    this.$routerPush({ name: 'index' })
  }
}
export default FoxoneAuthCallback
</script>

<style lang="scss" scoped>
.auth-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
