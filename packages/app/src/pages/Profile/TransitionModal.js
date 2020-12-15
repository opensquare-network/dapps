import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Header, Modal, Dropdown, Input } from "semantic-ui-react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

import { getApi } from "@services/api";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { addFlashToast, toastType } from "@store/reducers/toastSlice";

const Wrapper = styled.div`
  .small-button {
    height: 20px;
    width: 60px;
    opacity: 0.72;
    padding: 0 !important;
    font-size: 8px !important;
  }
`;

export default function () {
  const dispatch = useDispatch();
  const nowAddress = useSelector(nowAddressSelector);

  const [open, setOpen] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const [address, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");

  useEffect(() => {
    const getAllAccounts = async () => {
      await web3Enable("OpenSquare");
      const allAccounts = await web3Accounts();
      setAccounts(
        allAccounts.map((item) => ({
          key: item.address,
          value: item.address,
          text: item.meta.name,
        }))
      );
    };
    getAllAccounts();
  }, []);

  useEffect(() => {
    if (open === false) {
      setAddress("");
      setAmount("");
    }
  }, [open]);

  const transfer = async () => {
    const api = await getApi();
    await api.tx.currencies
      .transfer(address, "OSN", Number(amount))
      .signAndSend(nowAddress, async ({ events = [], status }) => {
        console.log(events, status);
        for (const item of events) {
          const { event } = item;
          const method = event.method;
          // const data = event.data.toJSON()
          if (method === "Transfer") {
            dispatch(addFlashToast(toastType.SUCCESS, "Transfer success"));
            setOpen(false);
            return;
          }
        }
      });
  };

  return (
    <Wrapper>
      <Modal
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button className="small-button" basic inverted color="grey">
            Transition
          </Button>
        }
      >
        <Modal.Header>Transition</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Address</Header>
            <Dropdown
              fluid
              selection
              options={accounts}
              placeholder="Select account..."
              value={address}
              onChange={(_, data) => setAddress(data.value)}
            />
            <Header>Amount</Header>
            <Input
              type="number"
              fluid
              label={{ basic: true, content: "OSN" }}
              labelPosition="right"
              placeholder="Enter amount..."
              value={amount}
              onChange={(_, data) => setAmount(data.value)}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary content="Cancel" onClick={() => setOpen(false)} />
          <Button primary content="Confirm" onClick={transfer} />
        </Modal.Actions>
      </Modal>
    </Wrapper>
  );
}
