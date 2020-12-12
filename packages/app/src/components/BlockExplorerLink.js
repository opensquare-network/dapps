import React from 'react'

export default function BlockExplorerLink({ href, children}) {
  return (
    <a
      href={new URL(href, process.env.REACT_APP_EXPLORER_SITE || 'http:127.0.0.1:3000').href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
