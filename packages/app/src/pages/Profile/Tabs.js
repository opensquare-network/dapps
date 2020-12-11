import Container from "@components/Container";
import React, { useEffect } from "react";
import Options from "@components/Options";
import { useDispatch, useSelector } from "react-redux";
import { profileTabs, profileTabSelector, setProfileTab } from "@store/reducers/profileSlice";
import FundBounties from "./FundBounties";
import PendingApproveBounties from "./PendingApproveBounties";
import OngoingBounties from "./OngoingBounties";
import ApplyingBounties from "./ApplyingBounties";
import BehaviorList from "./BehaviorList";
import {
  fetchFundBountiesCount,
  fundBountiesCountSelector,
  fetchPendingApproveBountiesCount,
  pendingApproveBountiesCountSelector,
  fetchApplyingBountiesCount,
  applyingBountiesCountSelector,
  fetchOngoingBountiesCount,
  ongoingBountiesCountSelector,
  fetchBehaviorsCount,
  behaviorsCountSelector,
} from "@store/reducers/profileSlice";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import styled from "styled-components";

const Badge = styled.div`
  margin: 0px;
  display: inline-block;
  background-color: ${p => p.active ? 'rgba(4, 210, 197, 0.1)' : '#F4F4F4' };
  color: ${p => p.active ? '#04D2C5' : '#1D253C' };
  border-radius: 14px;
  min-width: 28px;
  font-size: 12px;
  text-align: center;
`

export default function Tabs() {
  const profileTab = useSelector(profileTabSelector)
  const dispatch = useDispatch()
  const address = useSelector(nowAddressSelector)

  useEffect(() => {
    dispatch(fetchFundBountiesCount(address))
    dispatch(fetchPendingApproveBountiesCount(address))
    dispatch(fetchApplyingBountiesCount(address))
    dispatch(fetchOngoingBountiesCount(address))
    dispatch(fetchBehaviorsCount(address))
  }, [dispatch, address])

  const fundBountiesCount = useSelector(fundBountiesCountSelector)
  const pendingApproveBountiesCount = useSelector(pendingApproveBountiesCountSelector)
  const applyingBountiesCount = useSelector(applyingBountiesCountSelector)
  const ongoingBountiesCount = useSelector(ongoingBountiesCountSelector)
  const behaviorsCount = useSelector(behaviorsCountSelector)

  const tabSpec = (tab) => {
    switch (tab) {
      case 'Pending Approve': return { rowCount: pendingApproveBountiesCount, component: <PendingApproveBounties /> };
      case 'Fund Bounties': return { rowCount: fundBountiesCount, component: <FundBounties /> };
      case 'Ongoing Bounties': return { rowCount: ongoingBountiesCount, component: <OngoingBounties /> };
      case 'Applying Bounties': return { rowCount: applyingBountiesCount, component: <ApplyingBounties /> };
      case 'Behavior List': return { rowCount: behaviorsCount, component: <BehaviorList /> };
      default: return { rowCount: 0, component: <div /> }
    }
  }

  return (
    <Container>
      <Options>
        {
          profileTabs.map((tab, idx) => {
            return <li
              key={idx}
              className={tab === profileTab ? 'active' : null}
              onClick={() => {
                dispatch(setProfileTab(tab))
              }}
            >
              {tab} <Badge active={tab === profileTab}>{tabSpec(tab).rowCount}</Badge>
            </li>
          })
        }
      </Options>
      { tabSpec(profileTab).component }
    </Container>
  )
}
