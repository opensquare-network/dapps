import { shortStr } from "../utils";
import React from "react";
import BlockExplorerLink from "./BlockExplorerLink";

export default function AddressLink({ addr, truncate = true }) {
  let text = addr
  if (truncate) {
    text = shortStr(addr, 6)
  }

  return (
    <BlockExplorerLink href={`/accounts/${addr}`}>
      {text}
    </BlockExplorerLink>
  )
}
