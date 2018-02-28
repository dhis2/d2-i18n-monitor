import React from 'react'

export default function Item(props) {
  const { label, git } = props
  return (
    <tr>
      <td>
        <a
          href={`https://github.com/${git.id}/tree/${git.branch}`}
          target="_blank"
        >
          {label}
        </a>
      </td>
      <td></td>
    </tr>
  )
}
