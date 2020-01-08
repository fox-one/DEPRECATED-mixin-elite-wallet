import envUtil from '@/utils/envUtil'

export default function reloadTheme({ app, route }) {
  try {
    envUtil.reloadTheme() 
  } catch (error) {
    console.log('reloadTheme error', error)
  }
}