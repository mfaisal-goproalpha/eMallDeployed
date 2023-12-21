    export const reducer = (state, action) => {
        switch (action.type) {
            case "ADD_TO_CART":
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                }

        case "UPDATE_CART_ITEM":
            const itemIndex = state.cart.findIndex((item) => item._id === action.payload.id);
            if (itemIndex !== -1) {
                // If the item is found, update its count
                const updatedCart = [...state.cart];
                state[itemIndex].count = action.payload.count;
                return { ...state, cart: updatedCart };
            } else {
                // If the item is not in the cart, do nothing
                return state;
            }

        case "REMOVE_CART_ITEM":
            const filteredCart = state.cart.filter((item) => item.id !== action.payload)

            return {
                ...state,
                cart: filteredCart
            }
            break;
            case "CLEAR_CART":
                return {
                  ...state,
                  cart: [],
                };
        default:
            state;
    }

}