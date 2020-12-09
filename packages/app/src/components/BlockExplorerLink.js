import React from 'react'

export default function BlockExplorerLink({ href, children}) {
  return (
    <a
      href={new URL(href, process.env.REACT_APP_EXPLORER_SITE).href}
      target="_blank"
    >
      {children}
    </a>
  )
}
