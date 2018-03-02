import React from 'react'
import Template from './Template'
import { connect } from 'react-redux'
import { Button, Snackbar, TextField } from 'material-ui'
import { setConfig } from 'reducers'

class ConfigPage extends React.Component {
  static path = '/config'

  state = {
    showSnackBar: false,
    accessToken: '',
    orgs: '',
    skipRepos: '',
  }

  componentDidMount() {
    const { accessToken, orgs, skipRepos } = this.props.config
    this.setState({ accessToken, orgs, skipRepos })
  }

  componentWillReceiveProps(newProps) {
    const { accessToken, orgs, skipRepos } = newProps.config
    this.setState({ accessToken, orgs, skipRepos })
  }

  onSave = () => {
    const { accessToken, orgs, skipRepos } = this.state
    this.props.setConfig({ accessToken, orgs, skipRepos })
    this.setState({ showSnackBar: true })
  }

  onChange = name => evt => this.setState({ [name]: evt.target.value })

  render() {
    return (
      <Template>
        <div className="w-50 mx-auto mt-5">
          <p>
            Please follow{' '}
            <a
              rel="noopener noreferrer"
              href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/"
              target="_blank"
            >
              instructions here to generate
            </a>{' '}
            your GitHub personal access token. Grant all permissions under{' '}
            <strong>repo</strong>. We will store it as part of browser storage.
          </p>
          <TextField
            label="Access Token"
            fullWidth={true}
            value={this.state.accessToken}
            onChange={this.onChange('accessToken')}
            helperText="GitHub Personal Access Token"
          />

          <p className="mt-5">
            List of GitHub organizations to monitor. One per line. Leave to
            monitor all organizations. If you enter e.g. <strong>dhis2</strong>{' '}
            you will only monitor repositories related to dhis2 organization
            that you are part of in GitHub.
          </p>

          <TextField
            label="Organizations"
            fullWidth={true}
            multiline
            rows="5"
            value={this.state.orgs}
            onChange={this.onChange('orgs')}
            helperText="GitHub Organizations"
          />

          <p className="mt-5">
            List of repositories to <strong>NOT</strong> monitor.
          </p>

          <TextField
            label="Skip these repos."
            fullWidth={true}
            multiline
            rows="5"
            value={this.state.skipRepos}
            onChange={this.onChange('skipRepos')}
            helperText="GitHub Repositories which you do not want to monitor."
          />

          <div className="text-center mt-5">
            <Button variant="raised" color="primary" onClick={this.onSave}>
              Save
            </Button>
          </div>

          <Snackbar
            onClose={() => this.setState({ showSnackBar: false })}
            open={this.state.showSnackBar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            message={<span>configuration saved successfully.</span>}
          />
        </div>
      </Template>
    )
  }
}

ConfigPage = connect(({ config }) => ({ config }), { setConfig })(ConfigPage)
export { ConfigPage }
