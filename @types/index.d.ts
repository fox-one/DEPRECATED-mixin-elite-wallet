import 'nuxt-i18n'
import { IError } from '@/utils/errorHandler'
import { RootEvents } from '@/interface'

declare module 'vue/types/vue' {
  interface Vue {
    title?: any
    $errorHandler: ($toast: Function, error: IError) => {}
    $toast: (data: { message: string; color: string }) => {}
    $vuetify: any
    $routerPush: any
    $numUtil: any
    $dateUtil: any
    $rootEvents: RootEvents
    $icons: any
    $colors: any
  }

  interface VueConstructor {
    title?: any
  }
}
