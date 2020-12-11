import React from "react";
import styled from "styled-components";

import BountyItem from "./BountyItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export default function BountyList({ bounties, councilor = false }) {
  return (
    <Wrapper>
      { bounties.map(item =>
          <BountyItem key={item.bountyId} bounty={item} councilor={councilor} />
        ) }
    </Wrapper>

  )


}
