import { shortStr } from "../utils";
import React from "react";
import { useLocation } from "react-router";
import BlockExplorerLink from "./BlockExplorerLink";

export default function AddressLink({ addr, truncate = true, allowLinkToSelf = true }) {
  const { pathname } = useLocation()
  const linkTo = `/accounts/${addr}`

  let text = addr
  if (truncate) {
    text = shortStr(addr, 6)
  }

  if (!allowLinkToSelf && (pathname === linkTo || pathname.startsWith(`${linkTo}/`))) {
    return <div>{text}</div>
  } else {
    return (
      <BlockExplorerLink href={`/accounts/${addr}`}>
        {text}
      </BlockExplorerLink>
    )
  }
}
