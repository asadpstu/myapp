// redux/reducers/countReducer.js
const initialState = {
    cart: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        default:
            return state;
    }
};