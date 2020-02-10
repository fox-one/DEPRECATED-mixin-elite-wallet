import axios from 'axios'

export async function getRate () {
  const data = await axios('https://openapi.fox.one/wallet/exchange-rates')
  return data.data.data
}
