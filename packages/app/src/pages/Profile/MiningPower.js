import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { fetchSessionMiningPower, sessionMiningPowerSelector } from "@store/reducers/miningPowerSlice";

export default function MiningPower() {
  const address = useSelector(nowAddressSelector)
  const sessionMiningPower = useSelector(sessionMiningPowerSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSessionMiningPower(address))
  }, [dispatch, address])

  return (
    <span>{sessionMiningPower}</span>
  )
}
