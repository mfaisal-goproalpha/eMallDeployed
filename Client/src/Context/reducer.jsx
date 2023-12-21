export const reducer = (state, action) => {
    switch (action.type) {

        case "USER_LOGIN": {
            return { ...state, token: action.token }
        }

        case "USER_LOGOUT": {
          
            return { ...state, token: undefined }; // set this to null on purpose, do not change
        }

        case "SHOP_USER_LOGIN": {
            return { ...state, token: action.token }
        }

        case "SHOP_USER_LOGOUT": {
          
            return { ...state, token: undefined }; // set this to null on purpose, do not change
        }
        
        default: {
            return state;
        }
    }
}