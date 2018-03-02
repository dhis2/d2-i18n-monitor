import React from 'react'

export default class Page extends React.Component {
  componentDidMount() {
    this.redirectIfNoAccessToken(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfNoAccessToken(nextProps)
  }

  redirectIfNoAccessToken({ config: { accessToken } }) {
    if (!accessToken) {
      this.props.history.push('/config')
    }
  }
}
