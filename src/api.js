import axios from 'axios'
import { base64Decode } from './helpers'

axios.defaults.baseURL = 'https://api.github.com/'

const VERSION = 'mercy-preview'

class API {
  setAccessToken(token) {
    this.accessToken = token
  }

  headers() {
    return {
      Accept: `application/vnd.github.${VERSION}+json`,
      Authorization: `token ${this.accessToken}`
    }
  }

  request(url, method = 'GET') {
    return axios.request({
      url,
      method,
      headers: this.headers()
    })
  }

  repo = (owner, repo) => this.request(`/repos/${owner}/${repo}`)

  repos = () => {
    let list = []
    return new Promise(async (resolve, reject) => {
      let res,
        page = 0
      do {
        page += 1
        res = await this.request(`/user/repos?per_page=100&page=${page}`)
        list = list.concat(res.data)
      } while (res.headers.link && res.headers.link.includes('rel="next"'))

      resolve(list)
    })
  }

  contents(owner, repo, path, ref = 'master') {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `/repos/${owner}/${repo}/contents/${path}?ref=${ref}`
        const res = await axios.request({
          url,
          method: 'GET',
          headers: this.headers()
        })

        const { data: { content } } = res
        resolve({
          path,
          found: true,
          content: base64Decode(content)
        })
      } catch (e) {
        resolve({
          path,
          found: false,
          content: null
        })
      }
    })
  }
}

export const api = new API()
export default api

const suggestionsCache = {}
// Amagama API - same server used by Pootle
export function getSuggestion(src, dst, text) {
  if (suggestionsCache[text]) {
    return suggestionsCache[text]
  }

  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        `https://amagama-live.translatehouse.org/api/v1/${src}/${dst}/unit/${encodeURI(
          text
        )}`
      )
      suggestionsCache[text] = data
      resolve(data)
    } catch (e) {
      console.log('Amagama translation suggestions', e)
    }
  })
}
