import axios from 'axios'
import { base64Decode, base64Encode } from './helpers'

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

  request(url, method = 'GET', data = {}) {
    return axios.request({
      url,
      method,
      data,
      headers: this.headers()
    })
  }

  fetchBranch = (owner, repo, branch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.request(
          `/repos/${owner}/${repo}/git/refs/heads/${branch}`
        )
        resolve(data)
      } catch (e) {
        reject(null)
      }
    })
  }

  createBranch(owner, repo, branch, sha) {
    return this.request(`/repos/${owner}/${repo}/git/refs`, 'POST', {
      sha,
      ref: `refs/heads/${branch}`
    })
  }

  createAndFetchBranch(owner, repo, branch) {
    return new Promise(async (resolve, reject) => {
      let branchRef
      try {
        branchRef = await this.fetchBranch(owner, repo, branch)
      } catch (e) {
        const { object: { sha: masterSHA } } = await this.fetchBranch(
          owner,
          repo,
          'master'
        )
        const res = await this.createBranch(owner, repo, branch, masterSHA)
        branchRef = res.data
      }

      resolve(branchRef)
    })
  }

  fetchFile = (owner, repo, path, branch) =>
    this.request(`/repos/${owner}/${repo}/contents/${path}?ref=${branch}`)

  createFile(owner, repo, path, branch, content, message) {
    return this.request(`/repos/${owner}/${repo}/contents/${path}`, 'PUT', {
      path,
      message,
      branch,
      content: base64Encode(content)
    })
  }

  updateFile(owner, repo, path, branch, content, message, sha) {
    return this.request(`/repos/${owner}/${repo}/contents/${path}`, 'PUT', {
      sha,
      path,
      message,
      branch,
      content: base64Encode(content)
    })
  }

  createOrUpdateFile(owner, repo, path, branch, content, message) {
    return new Promise(async (resolve, reject) => {
      let file
      try {
        const { data: { sha: fileSHA } } = await this.fetchFile(
          owner,
          repo,
          path,
          branch
        )
        const resUpdate = await this.updateFile(
          owner,
          repo,
          path,
          branch,
          content,
          message,
          fileSHA
        )
        file = resUpdate.data
      } catch (e) {
        const resCreate = this.createFile(
          owner,
          repo,
          path,
          branch,
          content,
          message
        )
        file = resCreate.data
      }

      resolve(file)
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
