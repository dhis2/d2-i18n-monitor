import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui'
import { loadConfig } from 'reducers'

class Load extends React.Component {
  componentDidMount() {
    this.props.loadConfig()
  }

  render() {
    const { config } = this.props
    if (!config.loaded) {
      return (
        <div className="text-center mt-5">
          <CircularProgress size={80} thickness={1} />
        </div>
      )
    }

    return this.props.children
  }
}

Load = connect(({ config }) => ({ config }), { loadConfig })(Load)
export { Load }
