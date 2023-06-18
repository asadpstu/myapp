// redux/reducers/countReducer.js
const initialState = {
    cart: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const temp = [...state.cart]
            const filter = temp.filter(single => single.imdbID === action.payload['imdbID']);
            if (filter.length > 0) {
                filter[0].qty += action.payload.qty;
                return {
                    ...state,
                    cart: temp
                };
            }
            else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                };
            }


        case 'INCREASE_CART':

            const tempArray = [...state.cart]
            const filteredProducts = tempArray.filter(single => single.imdbID === action.payload['imdbID']);
            filteredProducts[0].qty += action.payload.qty;
            return {
                ...state,
                cart: tempArray
            };

        case 'DECREASE_CART':
            const tempArr = [...state.cart]
            const filteredProds = tempArr.filter(single => single.imdbID === action.payload['imdbID']);
            if (filteredProds[0].qty === 1) {
                const filteredProds = tempArr.filter(single => single.imdbID !== action.payload['imdbID']);
                return {
                    ...state,
                    cart: filteredProds
                };
            }
            else {
                filteredProds[0].qty -= action.payload.qty;
                return {
                    ...state,
                    cart: tempArr
                };
            }

        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            };


        default:
            return state;
    }
};