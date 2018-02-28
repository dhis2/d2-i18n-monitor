import React from 'react'
import { NavLink } from 'react-router-dom'

export function Menu() {
  return (
    <div className="d-flex border-bottom pb-1">
      <ul className="nav mx-auto">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/">
            Projects
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/config">
            Config
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
