import { createContext, useReducer, useContext } from "react";
import userReducer, { initialState } from "./userReducer";

const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const localCart = localStorage.getItem("localCart");
  const activeCart = localCart ? JSON.parse(localCart) : initialState.cart;
  console.log(`activeCart: `, activeCart);
  const [state, dispatch] = useReducer(userReducer, {
    ...initialState,
    cart: activeCart,
  });

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

  const changeIsLoggedIn = (boolean) => {
    dispatch({
      type: "IS_LOGGED_IN",
      payload: boolean,
    });
  };

  const value = {
    products: state.products,
    cart: state.cart,
    addToCart,
    removeFromCart,
    changeIsLoggedIn,
    isLoggedIn: state.isLoggedIn,
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
