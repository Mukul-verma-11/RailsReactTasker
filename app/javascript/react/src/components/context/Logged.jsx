import { createContext, useState } from "react";
import React from "react";
export const LoggedContext = createContext(null);

export const LoggedProvider = (props) => {
  const [log, setLog] = useState(0);

  return (
    <LoggedContext.Provider value={{ log,setLog }}>
      {props.children}
    </LoggedContext.Provider>
  );
};
