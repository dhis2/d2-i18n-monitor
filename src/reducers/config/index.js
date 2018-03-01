import { REHYDRATE } from 'redux-persist'
import { CONFIG_SET, CONFIG_RESET } from './actions'
import { setAccessToken } from '../../services'

const initialState = {
  accessToken: '',
  organizations: 'dhis2',
  skipRepos: ''
}

export default function configReducer(state = initialState, action) {
  const { type, payload } = action

  if (type === CONFIG_SET) {
    setAccessToken(payload.accessToken)
    return { ...state, ...payload }
  } else if (type === CONFIG_RESET) {
    return { ...initialState }
  } else if (payload && type === REHYDRATE) {
    setAccessToken(payload.config.accessToken)
    return {
      ...initialState,
      ...payload.config
    }
  }

  return state
}
