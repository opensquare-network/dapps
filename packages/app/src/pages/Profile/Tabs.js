import Container from "@components/Container";
import React from "react";
import Options from "@components/Options";
import { useDispatch, useSelector } from "react-redux";
import { profileTabs, profileTabSelector, setProfileTab } from "@store/reducers/profileSlice";

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
    </Container>
  )
}
