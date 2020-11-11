import { Button } from "semantic-ui-react";
import React from "react";

export default function Action() {
  return (
    <Button primary onClick={() => {
      console.log('fund')
    }}>Fund Bounty</Button>
  )
}
