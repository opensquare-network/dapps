import React from 'react';
import styled from "styled-components";
import Banner from "../../components/Banner";
import { BannerTitle } from "@components/Banner";
import PendingApproveBounties from "./PendingApproveBounties";

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

export default function() {
  return (
    <Wrapper>
      <BountiesBanner>
        <section>
          <BannerTitle>Bounty Explorer (Councilor)</BannerTitle>
        </section>
      </BountiesBanner>

      <PendingApproveBounties />
    </Wrapper>
  );
}
