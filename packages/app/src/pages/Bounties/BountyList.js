import { useSelector } from "react-redux";
import { bountiesSelector } from "../../store/reducers/explorerSlice";
import React from "react";
import EmptyBounty from "@pages/Bounties/EmptyBounty";

export default function BountyList() {
  const bounties = useSelector(bountiesSelector)

  if (bounties.length <= 0) {
    return <EmptyBounty />
  }
}
