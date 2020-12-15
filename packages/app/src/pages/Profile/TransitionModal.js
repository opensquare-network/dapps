import React from "react";
import styled from "styled-components";
import { Button, Header, Modal, Dropdown, Input } from "semantic-ui-react";

const Wrapper = styled.div`
  .small-button {
    height: 20px;
    width: 60px;
    opacity: 0.72;
    padding: 0 !important;
    font-size: 8px !important;
  }
`

export default function () {
  const [open, setOpen] = React.useState(false)

  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
  ]
  
  return (
    <Wrapper>
      <Modal
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="small-button" basic inverted color="grey">Transition</Button>}
      >
        <Modal.Header>Transition</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Address</Header>
            <Dropdown fluid selection options={countryOptions} placeholder='Select address...' />
            <Header>Amount</Header>
            <Input
              type="number"
              fluid
              label={{ basic: true, content: 'OSN' }}
              labelPosition='right'
              placeholder='Enter amount...'
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary content="Cancel" onClick={() => setOpen(false)}/>
          <Button
            primary
            content="Confirm"
            onClick={() => setOpen(false)}
          />
        </Modal.Actions>
      </Modal>
    </Wrapper>
  )
}
