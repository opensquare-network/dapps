import React from 'react'
import { isHex, shortHash } from "../utils";
import BlockExplorerLink from "./BlockExplorerLink";

export default function BlockLink({ value, truncate = false }) {
  let text = value

  if (isHex(value) && truncate) {
    text = shortHash(value, 6)
  }

  return (
    <BlockExplorerLink href={`/blocks/${value}`}>
      {text}
    </BlockExplorerLink>
  )
}
