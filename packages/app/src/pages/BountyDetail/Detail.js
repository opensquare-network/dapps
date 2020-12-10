import React from "react";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";

import HexText from "@components/HexText";
import Avatar from "@components/Avatar";
import { toPrecision } from "../../utils";
import { osnPrecision } from "../../utils/constants";
import HuntButton from "./HuntButton";
import AssignButton from "./AssignButton";
import SubmitButton from "./SubmitButton";
import ResolveButton from "./ResolveButton";
import RemarkFunderButton from "./RemarkFunderButton";


const Wrapper = styled.div`

`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  .avatar-content {
    min-width: 56px;
    flex-shrink: 0 0 56px;
  }

  .title-content {
    flex-grow: 1;
  }
`

const TitleWrapper = styled.div`
  min-height: 32px;
  display: flex;
  gap: 24px;

  & > .title {
    font-size: 16px;
    font-weight: bold;
    line-height: 32px;
    word-break: break-word;
  }

  & > .payment {
    font-size: 18px;
    font-weight: 700;
    line-height: 32px;
    color: #04D2C5;
    white-space: nowrap;
    margin-left: auto;
  }
`

const LabelWrapper = styled.div`
  & > div {
    display: inline-block;
    background: rgba(77, 113, 255, 0.1);
    border-radius: 4px;
    color: #4D71FF;
    font-size: 12px;
    line-height: 20px;
    padding: 2px 8px;
    margin-top: 4px;
    margin-right: 12px;
    :last-child {
      margin-right: 0;
    }
  }
`

const InfoWrapper = styled.div`
  background: #FBFBFB;
  border-radius: 4px;
  margin-top: 20px;
  padding: 20px 24px;
  display: grid;
  column-gap: 72px;
  grid-template-columns: repeat(auto-fit, minmax(296px, 1fr));
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    .info-title {
      color: rgba(29, 37, 60, 0.24);
    }
    .info-content {
      color: rgba(29, 37, 60, 0.64);
      margin: 0 0 auto;
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 20px;

  & > .button {
    margin-right: 0px;
  }
`

export default function ( { avatar, title, amount, currency, labels, info } ) {
  return (
    <Wrapper>
      <Header>
        <Avatar className="avatar-content" src={avatar} />
        <div className="title-content">
          <TitleWrapper>
            <HexText className="title" value={title || ""} />
            <div className="payment">{toPrecision(amount, osnPrecision, osnPrecision)} {currency}</div>
          </TitleWrapper>
          <LabelWrapper>
            { labels && labels.map((item, index) => (<div key={index}>{item}</div>)) }
          </LabelWrapper>
        </div>
      </Header>
      { info && info.length > 0 && <InfoWrapper>
        { info.map((item) => (
          <div key={item.title}>
            <span className="info-title">{item.title}</span>
            <span className="info-content">{item.content}</span>
          </div>
        )) }
        </InfoWrapper>
      }
      <ButtonWrapper>
        <Button basic disabled>
          <Icon name="share alternate" />
          Share
        </Button>
        <Button basic disabled>
          <Icon name="github" />
          Via on Github
        </Button>
        <HuntButton />
        <AssignButton />
        <SubmitButton />
        <ResolveButton />
        <RemarkFunderButton />
      </ButtonWrapper>
    </Wrapper>
  )
}
