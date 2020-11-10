import Container from "@components/Container";
import { Options } from "@pages/NewBounty/styledComponents";
import { newBountySourceOptions } from "@pages/NewBounty/constants";
import { newBountySourceSelector, setNewBountySourceType } from "../../store/reducers/newBountySlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OptionSelector() {
  const newBountySource = useSelector(newBountySourceSelector)
  const dispatch = useDispatch()

  return (
    <Container>
      <Options>
        {
          newBountySourceOptions.map((source, idx) => {
            return <li
              key={idx}
              className={source === newBountySource ? 'active' : null}
              onClick={() => {
                dispatch(setNewBountySourceType(source))
              }}>{source}</li>
          })
        }
      </Options>
    </Container>
  )
}
