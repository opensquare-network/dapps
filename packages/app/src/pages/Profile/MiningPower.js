import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { sessionMiningPowerSelector, fetchSessionMiningPower } from "@store/reducers/miningPowerSlice";
import styled from "styled-components";

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
