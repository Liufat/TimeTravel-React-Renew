import { useEffect, useReducer } from 'react';
import { createContext, useContext } from 'react';
import useLocalStorage from './useLocalstorage';
import { initialState, CarReducer } from './cartReducer';

const CartContext = createContext();

function CartProvider({
  children,
  initialCartItem = [],
  localStorageKey = 'TimeTravelCart',
}) {
  let items = initialCartItem;

  const init = (cartItems) => {
    if (cartItems.length !== 0) {
      return {
        ...initialState,
        items: cartItems,
        totalItems: cartItems.length,
        isEmpty: false,
      };
    }

    return { ...initialState };
  };

  if (!items.length) {
    try {
      const item = window.localStorage.getItem(localStorageKey);
      items = item ? JSON.parse(item) : [];
    } catch (err) {
      items = [];
      console.error(err);
    }
  }

  // console.log(init(items));
  const [cart, dispatch] = useReducer(CarReducer, items, init);
  // 先嘗試從localStorage獲取購物車資訊

  // init setValue(localstoage)
  const [storedValue, setValue] = useLocalStorage(localStorageKey, items);

  // when state.items change -> change localstorage value
  useEffect(() => {
    if (JSON.stringify(cart.items) !== storedValue) {
      setValue(cart.items);
    }
  }, [cart]);

  // console.log(cart);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    console.log(cart);
  };

  const removeItem = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  const updateItem = (item) => {
    dispatch({ type: 'UPDATE_ITEM', payload: item });
  };

  const plusOne = (item) => {
    dispatch({ type: 'PLUS_ONE', payload: item });
  };

  const minusOne = (item) => {
    dispatch({ type: 'MINUS_ONE', payload: item });
  };
  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateItem, plusOne, minusOne }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error('CartContext was used outside of the CartProvider');
  return context;
};

export { CartProvider, useCart };
