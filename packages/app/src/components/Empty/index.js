import React from 'react'
import noneLogo from '@static/ghost.svg'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  section {
    text-align: center;
  }

  img {
    width: 41px;
  }

  p {
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: rgba(29, 37, 60, 0.24);
  }
`

export default function Empty(props) {
  return (
    <Wrapper className={props.className} style={props.style}>
      <section>
        <img src={noneLogo} alt="empty" />
      </section>
      <p>{props.children}</p>
    </Wrapper>
  )
}
