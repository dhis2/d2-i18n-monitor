import { REHYDRATE } from 'redux-persist'
import { CONFIG_SET, CONFIG_RESET } from './actions'
import { api } from 'services'

const initialState = {
  accessToken: '',
  orgs: 'dhis2',
  skipRepos: ''
}

export default function configReducer(state = initialState, action) {
  const { type, payload } = action

  if (type === CONFIG_SET) {
    api.setAccessToken(payload.accessToken)
    return { ...state, ...payload }
  } else if (type === CONFIG_RESET) {
    return { ...initialState }
  } else if (payload && type === REHYDRATE) {
    api.setAccessToken(payload.config.accessToken)
    return {
      ...initialState,
      ...payload.config
    }
  }

  return state
}
