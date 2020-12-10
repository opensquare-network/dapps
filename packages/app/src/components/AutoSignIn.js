import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { accountSelector } from "@store/reducers/accountSlice";
import { signIn } from "../utils/signIn";

export default function() {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector)

  useEffect(() => {
    if (account) {
      signIn(account, dispatch).then(() => {
        console.log(`auto login with address ${account.address}`)
      });
    }
  })

  return null
}
