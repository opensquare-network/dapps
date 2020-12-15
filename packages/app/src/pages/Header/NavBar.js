import React from "react";

import { NavWrapper } from "./components";

export default function({ locationpathname, children }) {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
        return React.cloneElement(child, { locationpathname });
    }
    return child;
  });
  return <NavWrapper>{childrenWithProps}</NavWrapper>;
}
