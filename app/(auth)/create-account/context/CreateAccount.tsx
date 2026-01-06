"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface CreateAccountContextProps {
  step: number;
  setStep: (n: number) => void;
}

const CreateAccountContext = createContext<CreateAccountContextProps | null>(
  null
);

export const useCreateAccount = () => {
  const ctx = useContext(CreateAccountContext);
  if (!ctx)
    throw new Error(
      "useCreateAccount must be used inside CreateAccountProvider"
    );

  return ctx;
};

interface ProviderProps {
  children: ReactNode;
}

export default function CreateAccountProvider({ children }: ProviderProps) {
  const [step, setStep] = useState(2);

  return (
    <CreateAccountContext.Provider
      value={{
        step,
        setStep,
      }}
    >
      {children}
    </CreateAccountContext.Provider>
  );
}
