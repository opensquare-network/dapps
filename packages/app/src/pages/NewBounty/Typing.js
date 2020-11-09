import Container from "@components/Container";
import React from "react";
import styled from "styled-components";
import Card from "@components/Card";
import Title from "@components/Title";
import { Button, Input } from "semantic-ui-react";
import MarkdownEditor from "@pages/NewBounty/MarkdownEditor";
import Hint from "@components/Hint";

const Wrapper = styled(Container)`
  display: flex;
`

const Editor = styled(Card)`
  flex: 1;
  min-height: 976px;
  
  div.ui.input {
    width: 100%;
    margin-top: 8px;
  }
`

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
      }
      
      &:not(:first-of-type) {
        margin-top: 4px;
      }
    }
  }
  
`

export default function Typing() {
  return (
    <Wrapper>
      <Editor>
        <Title>Title</Title>
        <Input placeholder='Input bounty title' />
        <MarkdownEditor />
      </Editor>
      <Summary>
        <SummaryCard>
          <Title>Total</Title>
          <SummaryInfo>
            <section className="total">
              <h3>100 OSN</h3>
              <p><Hint>Payment Due</Hint></p>
            </section>
            <ol>
              <li>
                <Hint>Hunter</Hint>
                <span className="value">90 OSN</span>
              </li>
              <li>
                <Hint>Platform Fee</Hint>
                <span className="value">10 OSN</span>
              </li>
            </ol>
          </SummaryInfo>
          <Button primary onClick={() => {
            console.log('fund')
          }}>Fund Bounty</Button>
        </SummaryCard>
      </Summary>
    </Wrapper>
  )
}
