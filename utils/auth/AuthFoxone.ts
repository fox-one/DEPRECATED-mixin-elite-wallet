import { FOX_CLIENT_ID, FOX_OAUTH_HOST } from '@/constants'

const crypto = require('crypto')

class OAuth {
  sha256 (buffer) {
    return crypto
      .createHash('sha256')
      .update(buffer)
      .digest()
  }

  base64URLEncode (str) {
    return str
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  requestCode (pkce: boolean, state: any = '') {
    if (pkce) {
      this.requestCodePkce(state)
    } else {
      this.requestCodeServe(state)
    }
  }

  requestCodePkce (state) {
    const randomCode = crypto.randomBytes(32)
    const verifier = this.base64URLEncode(randomCode)
    const challenge = this.base64URLEncode(this.sha256(randomCode))
    localStorage.setItem('code-verifier', verifier)
    let url = `${FOX_OAUTH_HOST}?client_id=${FOX_CLIENT_ID}&scope=PHONE%3AREAD+PROFILE%3AREAD+ASSETS%3AREAD&code_challenge=${challenge}&response_type=code&code_challenge_method=S256`
    if (state) {
      const str = encodeURIComponent(JSON.stringify(state))
      url += `&state=${str}`
    }
    window.location.href = url
  }

  requestCodeServe (state) {
    let url = `${FOX_OAUTH_HOST}?client_id=${FOX_CLIENT_ID}&scope=PROFILE%3AREAD+PHONE%3AREAD+ASSETS%3AREAD&response_type=code`
    if (state) {
      const str = encodeURIComponent(JSON.stringify(state))
      url += `&state=${str}`
    }
    window.location.href = url
  }
}

export default new OAuth()
