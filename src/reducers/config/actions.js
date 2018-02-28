export const CONFIG_SET = 'config/set'
export const CONFIG_RESET = 'config/reset'

export const resetConfig = () => ({ type: CONFIG_RESET })

export const setConfig = config => () => {
  return dispatch => {
    window.localStorage.setItem('config', JSON.stringify(config))
    dispatch({ type: CONFIG_SET, payload: config })
  }
}

export const loadConfig = () => {
  return dispatch => {
    dispatch({
      type: CONFIG_SET,
      payload: Object.assign(
        {},
        JSON.parse(window.localStorage.getItem('config')),
        { loaded: true }
      )
    })
  }
}
