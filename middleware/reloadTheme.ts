import envUtil from '@/utils/envUtil'

export function setLayout({ app, route }) {
  try {
    envUtil.reloadTheme() 
  } catch (error) {
    console.log('reloadTheme error', error)
  }
}