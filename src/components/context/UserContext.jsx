import { createContext, useReducer, useContext } from "react";
import userReducer, { initialState } from "./userReducer";

const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  const removeFromCart = (product) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });
  };

  const value = {
    products: state.products,
    cart: state.cart,
    addToCart,
    removeFromCart,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useShopUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useShopUser must be used within UserContext");
  }

  return context;
};

export default useShopUser;
