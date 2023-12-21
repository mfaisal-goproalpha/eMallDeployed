    export const reducer = (state, action) => {
        switch (action.type) {
            case "ADD_TO_CART":
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                }

                case "EMPTY_CART":
                    return {
                        ...state,
                        cart: action.payload  
                    }

        case "REMOVE_CART_ITEM":
            const filteredCart = state.cart.filter((item) => item._id !== action.payload)

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
           return state;
    }
}