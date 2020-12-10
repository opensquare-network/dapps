import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { fetchReputation, reputationSelector } from "@store/reducers/reputationSlice";

export default function Reputation() {
  const address = useSelector(nowAddressSelector)
  const reputation = useSelector(reputationSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReputation(address))
  }, [dispatch, address])

  return (
    <span>{reputation}</span>
  )
}
