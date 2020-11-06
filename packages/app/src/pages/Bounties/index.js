import React from 'react';
import styled from "styled-components";
import Banner from "../../components/Banner";
import { Button, Input } from 'semantic-ui-react'

const Wrapper = styled.main`

`

const BountiesBanner = styled(Banner)`
  display: flex;
  align-items: center;
  
  & > section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    & > label {
      font-size: 28px;
      line-height: 44px;
      color: #FFFFFF;
      font-weight: bold;
    }
    
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
  return (
    <Wrapper>
      <BountiesBanner>
        <section>
          <label>Bounty Explorer</label>
          <Search>
            <Input icon='search' iconPosition='left' placeholder='Search Bounties...' />
            <Button primary>New Bounty</Button>
          </Search>
        </section>
      </BountiesBanner>
    </Wrapper>
  );
}
