import styled from "styled-components";
import Banner from "@components/Banner";
import React from "react";
import { useSelector } from "react-redux";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { freeBalanceSelector, reservedBalanceSelector } from "@store/reducers/balanceSlice";
import { osnPrecisionSelector } from "@store/reducers/chainSlice";
import { toPrecision } from "../../utils";
import Tabs from "@pages/Profile/Tabs";
import Avatar from "@pages/Profile/Avatar";
import Account from "@pages/Profile/Account";
import Reputation from "@pages/Profile/Reputation";
import MiningPower from "@pages/Profile/MiningPower";

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

const Left = styled.div`
  display: flex;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  align-items: center;

  li {

    &:not(:first-of-type) {
      margin-left: 30px !important;
    }

    & > div {
      font-weight: bold;
      font-size: 16px;
      text-align: right;

    }

  }
`

const Info = styled.section`
  margin-left: 24px;

  & > h3 {
    display: flex;
    margin: 0;
    font-weight: bold;
    font-size: 18px;
    line-height: 32px;
    color: #FFFFFF;
  }

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
        color: rgba(255, 255, 255, 0.72);
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
          <Left>
            <Avatar />
            <Info>
              <h3>
                {
                  address ?
                    <Account />
                    : '--'
                }
              </h3>
              <ol>
                <li>
                  <label>Free</label>
                  <span>{toPrecision(free, precision, false)} OSN</span>
                </li>
                <li>
                  <label>Reserved:</label>
                  <span>{toPrecision(reserved, precision, false)} OSN</span>
                </li>
              </ol>
            </Info>
          </Left>
          <Right>
            <Info>
              <ol>
                <li>
                  <div>
                    <Reputation />
                  </div>
                  <label>Reputation Score</label>
                </li>
                <li>
                  <div>
                    <MiningPower />
                  </div>
                  <label>Mining Power</label>
                </li>
              </ol>
            </Info>

          </Right>
        </section>
      </ProfileBanner>
      <Tabs />
    </Wrapper>
  )
}
