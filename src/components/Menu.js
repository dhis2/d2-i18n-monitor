import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

const LogoTitle = styled.h3`
  margin: 0;
`

export function Menu() {
  return (
    <nav className="w-100 navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        <LogoTitle>i18n Monitor</LogoTitle>
      </Link>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/projects">
            Projects
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/config">
            Config
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
