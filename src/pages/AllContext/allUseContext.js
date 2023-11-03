import { useCartContext } from '../cart/context/shopping-cart/useCart';
import { usePaymentInfoContext } from '../cart/context/shopping-cart/usePaymentInfo';

export const useCart = useCartContext;

export const usePaymentInfo = usePaymentInfoContext;
