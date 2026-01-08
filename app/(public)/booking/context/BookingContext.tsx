"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface BookingContextProps {
  step: number;
  setStep: (n: number) => void;
}

const BookingContext = createContext<BookingContextProps | null>(null);

export const useCreateBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx)
    throw new Error("useCreateBooking must be used inside BookingProvider");

  return ctx;
};

interface ProviderProps {
  children: ReactNode;
}

export default function BookingProvider({ children }: ProviderProps) {
  const [step, setStep] = useState(4);

  return (
    <BookingContext.Provider
      value={{
        step,
        setStep,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
