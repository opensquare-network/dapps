import React from 'react';
import styled from "styled-components";
import Banner from "../../components/Banner";
import { Button, Input } from 'semantic-ui-react'
import { useHistory } from 'react-router'
import { BannerTitle } from "@components/Banner";
import AcceptedBounties from "@pages/Bounties/AcceptedBounties";

const Wrapper = styled.main`

`

const BountiesBanner = styled(Banner)`
  display: flex;
  align-items: center;

  & > section {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: 1140px) {
      width: 1128px;
      margin: 0 auto;
    }

    @media screen and (max-width: 1140px) {
      width: 100%;
    }
  }
`

const Search = styled.section`
  display: inline-flex;

  & > div {
    margin-right: 24px;
    width: 552px;
  }
`

export default function() {
  const history = useHistory()

  return (
    <Wrapper>
      <BountiesBanner>
        <section>
          <BannerTitle>Bounty Explorer</BannerTitle>
          <Search>
            <Input icon='search' iconPosition='left' placeholder='Search Bounties...' />
            <Button primary onClick={() => {
              history.push(`/fund`)
            }}>New Bounty</Button>
          </Search>
        </section>
      </BountiesBanner>

      <AcceptedBounties />
    </Wrapper>
  );
}
