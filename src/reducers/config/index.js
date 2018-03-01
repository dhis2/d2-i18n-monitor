import { REHYDRATE } from 'redux-persist'
import { CONFIG_SET, CONFIG_RESET } from './actions'

const initialState = {
  accessToken: '',
  organizations: 'dhis2',
  skipRepos: ''
}

export default function configReducer(state = initialState, action) {
  const { type, payload } = action

  if (type === CONFIG_SET) {
    return { ...state, ...payload }
  } else if (type === CONFIG_RESET) {
    return { ...initialState }
  } else if (payload && type === REHYDRATE) {
    return {
      ...initialState,
      ...payload.config
    }
  }

  return state
}
