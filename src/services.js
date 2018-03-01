import GitHub from 'github-api'

let accessToken = ''
let githubAPI = new GitHub({ token: '' })

export function setAccessToken(newAccessToken) {
  if (accessToken !== newAccessToken) {
    githubAPI = new GitHub({ token: newAccessToken })
    accessToken = newAccessToken
  }
}

export function api() {
  return githubAPI
}
