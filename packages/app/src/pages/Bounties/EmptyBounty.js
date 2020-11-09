import styled from "styled-components";
import React from "react";
import Empty from "@components/Empty";
import { Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  
  & > span {
    margin-top: 10px;
  }
`

export default function EmptyBounty() {
  const history = useHistory()

  return (
    <Wrapper>
      <Empty>No Bounties</Empty>
      <span>
        <Button basic onClick={() => {
          history.push(`/fund`)
        }}>
          <Icon name="plus" />
          Fund a Bounty
        </Button>
      </span>
    </Wrapper>
  )
}
