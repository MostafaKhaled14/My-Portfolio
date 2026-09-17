import { useState } from "react";
import { MyContext } from "./MyContext";

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
