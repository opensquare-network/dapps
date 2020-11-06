import React from "react";
import { NewBountyBanner, Note, Wrapper } from "@pages/NewBounty/styledComponents";
import { BannerTitle } from "@components/Banner";

export default function NewBounty() {
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
    </Wrapper>
  )
}
