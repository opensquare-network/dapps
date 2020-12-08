import React from 'react'

function HexText({ className, value }) {
  if (value.startsWith('0x')) {
    value = value.substr(2)
  }

  if (value.length === 0) {
    return <div />
  }

  return (
    <div className={className}>{decodeURIComponent('%'+value.match(/.{1,2}/g).join('%'))}</div>
  )
}

export default HexText
