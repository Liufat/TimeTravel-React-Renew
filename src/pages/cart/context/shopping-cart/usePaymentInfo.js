import { createContext, useContext, useState } from 'react';

const PaymentInfoContext = createContext();

function PaymentInfoProvider({ children }) {
  const [hotelInformation, setHotelInformation] = useState({
    hotelRepresent: '',
    hotelMobile: '',
  });
  const [paymentInformation, setPaymentInformation] = useState({
    paymentRepresent: '',
    paymentMobile: '',
    paymentEmail: '',
    paymentId: '',
  });

  const changeHotelInformation = (payload) => {
    const newObj = { ...hotelInformation, ...payload };
    setHotelInformation(newObj);
  };
  const changePaymentInformation = (payload) => {
    const newObj = { ...paymentInformation, ...payload };
    setPaymentInformation(newObj);
  };
  return (
    <PaymentInfoContext.Provider
      value={{
        hotelInformation,
        paymentInformation,
        changeHotelInformation,
        changePaymentInformation,
      }}
    >
      {children}
    </PaymentInfoContext.Provider>
  );
}

const usePaymentInfoContext = () => {
  const context = useContext(PaymentInfoContext);
  if (context === undefined)
    throw new Error('CartContext was used outside of the CartProvider');
  return context;
};

export { PaymentInfoProvider, usePaymentInfoContext };
