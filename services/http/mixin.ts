/* eslint-disable prefer-promise-reject-errors */
import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from '@/utils/loginUtil'
import { MIXIN_API_HOST } from '@/constants'

const foxone = axios.create({
  baseURL: MIXIN_API_HOST,
  timeout: 15000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

foxone.interceptors.request.use(
  async (configs) => {
    if (configs.url === '/oauth/token') {
      return configs
    }
    const token = await getToken({ type: 'mixin' })
    if (token) {
      configs.headers.Authorization = `Bearer ${token}`
    }
    return configs
  },
  (_) => {}
)

foxone.interceptors.response.use(
  (res) => {
    if (!res.data) {
      return Promise.reject({ code: -1 })
    }
    if (res.data.error) {
      const error = res.data.error
      if (error.code === (401 || 403)) {
        return Promise.reject({ code: error.code })
      }
      return Promise.reject({ code: error.code, message: error.description })
    } else {
      return Promise.resolve(res.data)
    }
  },
  (err) => {
    if (err.response && err.response.data) {
      return Promise.reject(err.response.data)
    } else {
      return Promise.reject({ code: -1 })
    }
  }
)

async function request (options: AxiosRequestConfig): Promise<any> {
  const res = await foxone.request(options)
  return Promise.resolve(res.data)
}

export default {
  post (url: string, options: AxiosRequestConfig = {}) {
    const config = {
      url,
      method: 'post',
      ...options
    }
    return request(config as AxiosRequestConfig)
  },

  get (url: string, options: AxiosRequestConfig = {}): Promise<any> {
    const config = {
      url,
      method: 'get',
      ...options
    }
    return request(config as AxiosRequestConfig)
  },

  delete (url: string, options: AxiosRequestConfig = {}): Promise<any> {
    const config = {
      url,
      method: 'delete',
      ...options
    }
    return request(config as AxiosRequestConfig)
  }
}
