export const initialState = {
  cart: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };

    case "DELETE_FROM_CART":
      //find index
      const id = state.cart.findIndex((item) => item.id === action.payload);
      if (id < 0) {
        return { ...state };
      } else {
        let tempCart = [...state.cart];
        tempCart.splice(id, 1);
        return { ...state, cart: tempCart };
      }

    default:
      return { ...state };
  }
};
