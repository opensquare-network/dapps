import React from 'react';
import { Wrapper } from "./components";
import { ReactComponent as Logo } from './logo.svg';

export default function() {
  return <Wrapper>
    <div>
      <Logo height={60} />
    </div>
  </Wrapper>
}
