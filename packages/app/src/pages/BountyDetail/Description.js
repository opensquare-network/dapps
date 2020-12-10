import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const Wrapper = styled.div`
  .title {
    line-height: 28px;
    font-weight: 500;
    color: #1D253C;
  }
`

const Markdown = styled(ReactMarkdown)`
  margin-top: 8px;
  & > p {
    color: rgba(29, 37, 60, 0.64);
  }
`

export default function({ md }) {
  return (
    <Wrapper>
      <div className="title">Description</div>
      <Markdown source={md}></Markdown>
    </Wrapper>
  )
}
