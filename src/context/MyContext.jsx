import React, { createContext, useState } from "react";
export const MyContext = createContext();

export default function MyContextProvider({ children }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <MyContext.Provider
      value={{
        setIsSelected,
        isSelected,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
