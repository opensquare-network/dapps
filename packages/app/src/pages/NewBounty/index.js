import React from "react";
import { NewBountyBanner, Note, Options, Wrapper } from "@pages/NewBounty/styledComponents";
import { BannerTitle } from "@components/Banner";
import Container from "@components/Container";
import { useDispatch, useSelector } from "react-redux";
import { newBountySourceSelector, setNewBountySourceType } from "../../store/reducers/newBountySlice";
import { newBountySourceOptions } from './constants'
import Typing from "@pages/NewBounty/Typing";

export default function NewBounty() {
  const newBountySource = useSelector(newBountySourceSelector)
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <NewBountyBanner>
        <section>
          <BannerTitle>Fund Bounty</BannerTitle>
          <Note>
            <p>Fund your bounty and</p>
            <p>work with talented developers!</p>
          </Note>
        </section>
      </NewBountyBanner>
      <Container>
        <Options>
          {
            newBountySourceOptions.map((source, idx) => {
              return <li
                key={idx}
                className={source === newBountySource ? 'active' : null}
                onClick={() => {
                  dispatch(setNewBountySourceType(source))
                }}>{source}</li>
            })
          }
        </Options>
      </Container>
      <Typing />
    </Wrapper>
  )
}
