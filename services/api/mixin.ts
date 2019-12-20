import http from '@/services/http/mixin'
import { MIXIN_CLIENT_ID } from '@/constants'
import StorageUtil from '@/utils/storageUtil'
import { StorageKeys } from '@/constants'

export async function getAccessToken(code: string): Promise<string> {
  const verifier = localStorage.getItem('code-verifier')
  const data = {
    client_id: MIXIN_CLIENT_ID,
    code,
    code_verifier: verifier
  }
  const res = await http.post('/oauth/token', { data })
  return res.access_token
}

export function getAssets() {
  return http.get('/assets')
}

export function getAsset(id: string) {
  return http.get(`/assets/${id}`)
}

export function getAssetAddresses(id: string) {
  return http.get(`/assets/${id}/addresses`)
}

export function getAddress(id: string) {
  return http.get(`/addresses/${id}`)
}

export function  getSnapshots(params) {
  return http.get('/snapshots', { params })
}

export function getSnapshot(id: string) {
  return http.get(`/network/snapshots/${id}`)
}

export function getUser(id: string) {
  return http.get(`/users/${id}`)
}

export function getProfile() {
  return http.get('/me')
}

export function getExternalTransactions (params) {
  return http.get('/external/transactions', { params })
}

export function login(token) {
  StorageUtil.set(StorageKeys.MIXIN_TOKEN, token)
}