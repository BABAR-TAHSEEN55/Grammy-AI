"use client";
import { createContext, useContext, useState } from "react";

type ContextType = {
  context: string;
  setContext: (context: string) => void;
};

const ContextContext = createContext<ContextType | undefined>(undefined);
export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [context, setContext] = useState("");
  return (
    <ContextContext.Provider value={{ context, setContext }}>
      {children}
    </ContextContext.Provider>
  );
};

export const useContextContext = () => {
  const ctx = useContext(ContextContext);
  if (!ctx) {
    throw new Error(
      "UseContextContext must be wrapped inside withing ContextProvider",
    );
  }
  return ctx;
};
