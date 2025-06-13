import { createContext, useState } from "react";
export const MyContext = createContext();

export default function MyContextProvider({ children }) {
  const [isSelected, setIsSelected] = useState(false, null);

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
