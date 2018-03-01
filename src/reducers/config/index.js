import { CONFIG_SET, CONFIG_RESET } from './actions'

const initialState = {
  accessToken: undefined
}

export default function configReducer(state = initialState, action) {
  const { type, payload } = action

  if (type === CONFIG_SET) {
    return { ...state, ...payload }
  } else if (type === CONFIG_RESET) {
    return { ...initialState }
  }

  return state
}
