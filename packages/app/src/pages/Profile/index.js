import styled from "styled-components";
import Banner from "@components/Banner";
import React from "react";
import { useSelector } from "react-redux";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { freeBalanceSelector, reservedBalanceSelector } from "@store/reducers/balanceSlice";
import { osnPrecisionSelector } from "@store/reducers/chainSlice";
import { toPrecision } from "../../utils";

const Wrapper = styled.div`
  padding-bottom: 30px;
`

export const ProfileBanner = styled(Banner)`
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

const Info = styled.section`
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  color: #FFFFFF;
  
  ol {
    display: flex;
    
    li {
      font-size: 14px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.32);
      font-weight: normal;
      
      &:not(:first-of-type) {
        margin-left: 20px;
      }
      
      span {
        margin-left: 5px;
      }
    }
  }
`

export default function Profile() {
  const address = useSelector(nowAddressSelector)

  const free = useSelector(freeBalanceSelector)
  const reserved = useSelector(reservedBalanceSelector)
  const precision = useSelector(osnPrecisionSelector)

  return (
    <Wrapper>
      <ProfileBanner>
        <section>
          <Info>
            <h3>{address || '--'}</h3>
            <ol>
              <li>
                <label>Free:</label>
                <span>{toPrecision(free, precision, false)} OSN</span>
              </li>
              <li>
                <label>Reserved:</label>
                <span>{toPrecision(reserved, precision, false)} OSN</span>
              </li>
            </ol>
          </Info>
        </section>
      </ProfileBanner>
    </Wrapper>
  )
}