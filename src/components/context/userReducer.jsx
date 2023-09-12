export const initialState = {
  products: [],
  cart: [],
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART":
      console.log("ADD_TO_CART", payload);

      const isInCart = state.cart.find((product) => product.id === payload.id);

      if (isInCart) {
        return {
          ...state,
          cart: state.cart.map((product) => {
            return product.id === payload.id
              ? { ...product, qty: product.qty + 1 }
              : product;
          }),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...payload, qty: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      console.log("REMOVE_FROM_CART", payload);

      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== payload.id),
      };

    default:
      throw new Error(`No case for type ${type} found in userReducer.`);
  }
};

export default userReducer;
