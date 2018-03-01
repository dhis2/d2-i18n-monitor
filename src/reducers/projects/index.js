const initialState = [
  {
    label: 'Dashboards App',
    git: {
      id: 'dhis2/dashboards-app',
      branch: 'master'
    }
  },
  {
    label: 'Maintenance App',
    git: {
      id: 'dhis2/maintenance-app',
      branch: 'master'
    }
  }
]

export default function configReducer(state = initialState, action) {
  return state
}
