import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAccount } from "@store/reducers/accountSlice";
import { signIn } from "../utils/signIn";

export default function() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const account = JSON.parse(localStorage.getItem("currentAccount"));
      if (account) {
        signIn(account);
        dispatch(setAccount(account));
      }
    } catch {
      console.log("auto sign error");
    }
  })
  return null
}
