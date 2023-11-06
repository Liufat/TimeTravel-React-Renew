import { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

function ProgressContextProvider({ children }) {
  const maxSteps = 4;
  const [step, setStep] = useState(1);
  const next = () => {
    // 沒錯誤才會到下一步
    if (step < maxSteps) setStep(step + 1);
  };
  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <ProgressContext.Provider value={{ step, maxSteps, next, prev }}>
      {children}
    </ProgressContext.Provider>
  );
}

const useProgressContext = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('ProgressContext was used outside of the ProgressProvider');
  }
  return context;
};

export { useProgressContext, ProgressContextProvider };
