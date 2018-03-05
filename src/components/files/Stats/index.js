import React from 'react'
import PackageJson from './PackageJson'

export class Stats extends React.Component {
  view() {
    const { path, content } = this.props

    if (path.endsWith('package.json')) {
      // handle package.json
      return <PackageJson content={content} />
    } else if (path.endsWith('.travis.yml')) {
      // handle .travis.yml
    } else if (path.endsWith('.pot') || path.endsWith('.po')) {
      // handle .pot / .po language files
    }

    return null
  }
  render() {
    return <div className="mt-3 mb-3">{this.view()}</div>
  }
}
