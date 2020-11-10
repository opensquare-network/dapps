import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@components/Card";
import Title from "@components/Title";
import Hint from "@components/Hint";
import { Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { newBountyTokenAmountSelector, newBountyTokenSelector } from "@store/reducers/newBountySlice";

const Summary = styled.div`
  width: 360px;
  margin-left: 24px;
`

const SummaryCard = styled(Card)`
  button {
    width: 100%;
  }
`

const SummaryInfo = styled.div`
  background: #FBFBFB;
  border-radius: 4px;
  
  padding: 30px 24px 20px;
  margin: 8px 0 28px;
  
  section.total {
    text-align: center;
    h3 {
      color: #1D253C;
      font-weight: bold;
      font-size: 18px;
      line-height: 32px;
      margin: 0;
    }
  }
  
  ol {
    margin-top: 10px;
    
    li {
      display: flex;
      justify-content: space-between;
      
      span.value {
        font-size: 14px;
        line-height: 24px;
        color: rgba(29, 37, 60, 0.64);
        
        & > span {
          margin-left: 5px;
        }
      }
      
      &:not(:first-of-type) {
        margin-top: 4px;
      }
    }
  }
`

const Token = styled.span`
  margin-left: 8px;

  font-size: 18px;
  line-height: 32px;
  color: rgba(29, 37, 60, 0.64);
`

export default function BountySummary() {
  const [showAmount, setShowAmount] = useState(null)
  const [hunterFee, setHunterFee] = useState(null)
  const [platformFee, setPlatformFee] = useState(null)

  const token = useSelector(newBountyTokenSelector)
  const amount = useSelector(newBountyTokenAmountSelector)

  useEffect(() => {
    const parsed = parseFloat(amount)
    if (isNaN(parsed)) {
      setShowAmount(0)
      setHunterFee(0)
      setPlatformFee(0)
    } else {
      setShowAmount(parsed)
      setHunterFee(parsed * 0.9)
      setPlatformFee(parsed * .1)
    }
  }, [amount])

  return (
    <Summary>
      <SummaryCard>
        <Title>Total</Title>
        <SummaryInfo>
          <section className="total">
            <h3>{(showAmount || 0).toFixed(2)} <Token>{token}</Token></h3>
            <p><Hint>Payment Due</Hint></p>
          </section>
          <ol>
            <li>
              <Hint>Hunter</Hint>
              <span className="value">{hunterFee || 0}<span>{token}</span></span>
            </li>
            <li>
              <Hint>Platform Fee</Hint>
              <span className="value">{platformFee || 0}<span>{token}</span></span>
            </li>
          </ol>
        </SummaryInfo>
        <Button primary onClick={() => {
          console.log('fund')
        }}>Fund Bounty</Button>
      </SummaryCard>
    </Summary>
  )
}
