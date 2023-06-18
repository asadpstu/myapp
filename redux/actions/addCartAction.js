export const addCart = (payload) => {
    return {
        type: 'ADD_TO_CART',
        payload: payload
    };
};

export const increaseCart = (payload) => {
    return {
        type: 'INCREASE_CART',
        payload: payload
    };
};


export const decreaseCart = (payload) => {
    return {
        type: 'DECREASE_CART',
        payload: payload
    };
};


export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    };
};


