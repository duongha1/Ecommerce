const initState = {
    cart: []
  }
const root_reducer = function(state = initState, action){
    if(action.type === "ADD_TO_CART"){
        const exist_product_index = state.cart.findIndex(product => product.id === action.payload.id)
        let new_cart;
        if(exist_product_index < 0){
            new_cart = [
                ...state.cart,
                {
                    ...action.payload,
                    id_cart: Date.now()
                }
            ]
        }else{
            new_cart = [...state.cart]
            new_cart[exist_product_index].quantity = new_cart[exist_product_index].quantity + action.payload.quantity
        }
        return{
            ...state,
            cart: new_cart
        }
    }else if(action.type === "UPDATE_CART"){
        const exist_product_index = state.cart.findIndex(product => product.id_cart === action.payload.id_cart)
        const new_cart = [...state.cart]
        new_cart[exist_product_index].quantity = action.payload.quantity
        return {
            ...state,
            cart: new_cart
        }
    }else if(action.type === "DELETE_CART"){
        const new_cart = state.cart.filter(product => {
            return product.id_cart !== action.payload
        })
        return {
            ...state,
            cart: new_cart
        }
    }else if(action.type === "CLEAR_CART"){
        const new_cart = []
        return {
            ...state,
            cart: new_cart
        }
    }
    return state;
}

export default root_reducer;