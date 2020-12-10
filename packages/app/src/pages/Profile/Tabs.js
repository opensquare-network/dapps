import Container from "@components/Container";
import React from "react";
import Options from "@components/Options";
import { useDispatch, useSelector } from "react-redux";
import { profileTabs, profileTabSelector, setProfileTab } from "@store/reducers/profileSlice";
import FundBounties from "./FundBounties";
import PendingApproveBounties from "./PendingApproveBounties";
import OngoingBounties from "./OngoingBounties";
import ApplyingBounties from "./ApplyingBounties";
import BehaviorList from "./BehaviorList";

export default function Tabs() {
  const profileTab = useSelector(profileTabSelector)
  const dispatch = useDispatch()

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
              {tab}
            </li>
          })
        }
      </Options>
      {profileTab === 'Pending Approve' && <PendingApproveBounties />}
      {profileTab === 'Fund Bounties' && <FundBounties />}
      {profileTab === 'Ongoing Bounties' && <OngoingBounties />}
      {profileTab === 'Applying Bounties' && <ApplyingBounties />}
      {profileTab === 'Behavior List' && <BehaviorList />}
    </Container>
  )
}
