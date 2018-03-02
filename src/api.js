import axios from 'axios'

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

  contents = (owner, repo, path, ref = 'master') => {
    const url = `/repos/${owner}/${repo}/contents/${path}?ref=${ref}`
    return axios.request({
      url,
      method: 'GET',
      headers: this.headers()
    })
  }
}

export const api = new API()
export default api
