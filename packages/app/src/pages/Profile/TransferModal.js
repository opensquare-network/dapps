import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Header, Modal, Dropdown, Input } from "semantic-ui-react";
import BigNumber from "bignumber.js";

import { getApi } from "@services/api";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import {
  isLoginSelector,
  nowAddressSelector,
} from "@store/reducers/accountSlice";
import {
  osnPrecisionSelector,
  ss58FormatSelector,
} from "@store/reducers/chainSlice";
import { addFlashToast, toastType } from "@store/reducers/toastSlice";
import { freeBalanceSelector } from "@store/reducers/balanceSlice";

const Wrapper = styled.div`
  .small-button {
    height: 20px;
    width: 50px;
    opacity: 0.72;
    padding: 0 !important;
    font-size: 10px !important;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  aligin-items: center;
  justify-content: space-between;

  & span:first-child {
    color: rgba(29, 37, 60, 0.64);
    font-size: 10px;
  }
`;

const Item = ({ address, name }) => {
  return (
    <OptionWrapper>
      <span>{address}</span>
      <span>{name}</span>
    </OptionWrapper>
  );
};

const CURRENCY_ID = "OSN";

export async function estimateTransferFee(
  api,
  address,
  realAmount,
  nowAddress
) {
  const paymentInfo = await api.tx.currencies
    .transfer(address, CURRENCY_ID, realAmount)
    .paymentInfo(nowAddress);
  const txFee = new BigNumber(paymentInfo.partialFee);
  return txFee;
}

export default function () {
  const dispatch = useDispatch();
  const nowAddress = useSelector(nowAddressSelector);
  const isLogin = useSelector(isLoginSelector);
  const precision = useSelector(osnPrecisionSelector);
  const free = useSelector(freeBalanceSelector);
  const ss58Format = useSelector(ss58FormatSelector);

  const [open, setOpen] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const [address, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  useEffect(() => {
    const getAllAccounts = async () => {
      await web3Enable("OpenSquare");
      const allAccounts = await web3Accounts();
      setAccounts(
        allAccounts.map((item) => {
          const pub = decodeAddress(item.address, true);
          const address = encodeAddress(pub, ss58Format);
          return {
            key: address,
            value: address,
            text: address,
            content: <Item address={address} name={item.meta.name} />,
          };
        })
      );
    };
    getAllAccounts();
  }, []);

  useEffect(() => {
    if (open === false) {
      setAddress("");
      setAmount("");
      setIsButtonDisabled(false);
    }
  }, [open]);

  const transfer = async () => {
    if (!address) {
      dispatch(addFlashToast(toastType.ERROR, "Please select an address"));
      return;
    }
    if (!amount) {
      dispatch(addFlashToast(toastType.ERROR, "Please enter an amount"));
      return;
    }
    if (isNaN(amount) || Number(amount <= 0)) {
      dispatch(addFlashToast(toastType.ERROR, "Incorrect amount"));
      return;
    }
    try {
      setIsButtonDisabled(true);
      const realAmount = new BigNumber(amount)
        .multipliedBy(Math.pow(10, precision))
        .toNumber();
      const api = await getApi();
      const freeBalance = new BigNumber(free);
      const txFee = await estimateTransferFee(
        api,
        address,
        realAmount,
        nowAddress
      );
      if (freeBalance.lt(txFee.plus(realAmount))) {
        dispatch(
          addFlashToast(
            toastType.ERROR,
            "Your balance is not enough to cover the transaction fee"
          )
        );
        setIsButtonDisabled(false);
        return;
      }
      const unsub = await api.tx.currencies
        .transfer(address, CURRENCY_ID, realAmount)
        .signAndSend(nowAddress, async ({ events = [], status }) => {
          if (status.isFinalized) {
            unsub();
          }
          if (!status.isInBlock) {
            return;
          }
          dispatch(addFlashToast(toastType.INFO, "Extrinsic inBlock"));
          for (const item of events) {
            const { event } = item;
            const method = event.method;
            if (method === "Transferred") {
              dispatch(addFlashToast(toastType.SUCCESS, "Transfer success"));
              setOpen(false);
              return;
            }
          }
          dispatch(addFlashToast(toastType.ERROR, "Transfer error"));
          setIsButtonDisabled(false);
        });
    } catch {
      dispatch(addFlashToast(toastType.ERROR, "Transfer error"));
      setIsButtonDisabled(false);
    }
  };

  if (isLogin) {
    return (
      <Wrapper>
        <Modal
          size="small"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Button className="small-button" basic inverted color="grey">
              Transfer
            </Button>
          }
        >
          <Modal.Header>Transfer</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Address</Header>
              <Dropdown
                fluid
                selection
                options={accounts}
                placeholder="Select account..."
                value={address}
                onChange={(_, { value }) => setAddress(value)}
                search
                additionLabel="New Address: "
                allowAdditions
                onAddItem={(_, { value }) => {
                  setAccounts([
                    {
                      text: value,
                      key: value,
                      value,
                      content: <Item address={value} />,
                    },
                    ...accounts,
                  ]);
                }}
              />
              <Header>Amount</Header>
              <Input
                type="number"
                fluid
                label={{ basic: true, content: "OSN" }}
                labelPosition="right"
                placeholder="Enter amount..."
                value={amount}
                onChange={(_, { value }) => setAmount(value)}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button secondary content="Cancel" onClick={() => setOpen(false)} />
            <Button
              primary
              content="Confirm"
              onClick={transfer}
              disabled={isButtonDisabled}
            />
          </Modal.Actions>
        </Modal>
      </Wrapper>
    );
  } else {
    return null;
  }
}
