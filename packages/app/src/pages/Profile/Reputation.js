import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { reputationSelector, fetchReputation } from "@store/reducers/reputationSlice";
import styled from "styled-components";

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
