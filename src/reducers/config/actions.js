export const CONFIG_SET = 'config/set'
export const CONFIG_RESET = 'config/reset'

export const resetConfig = () => ({ type: CONFIG_RESET })

export const setConfig = config => ({ type: CONFIG_SET, payload: config })
