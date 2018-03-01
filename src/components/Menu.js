import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        i18n Monitor
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
