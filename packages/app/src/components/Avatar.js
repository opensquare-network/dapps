import React from "react";
import styled from "styled-components";
import { Image } from "semantic-ui-react";

import defaultAvatar from "@static/default-avatar.svg";

const Wrapper = styled.div`
  img {
    width: ${p => p.width || '56px'};
    height: ${p => p.height || '56px'};
  }
`

export default function Avatar({ src, width, height, className }) {
  return (
    <Wrapper width={width} height={height} className={className}>
      <Image src={src || defaultAvatar} alt="avatar" />
    </Wrapper>
  )
}
