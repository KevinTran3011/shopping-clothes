import { createContext, useEffect, useState, useReducer } from "react";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) =>{
    //finds out if cart item contains product to add
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    
    //if there is, increment the quantity by 1, if not, add it to the list
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
          cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }


    //return new array with modified cart items/ new cart item
    return[...cartItems, {...productToAdd,  quantity: 1}];

}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // Find cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    // Check if quantity is 1, if it is, remove it from the cart
    if (existingCartItem.quantity === 1) {
        cartItems = cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    } else {
        // If quantity > 1, return the cart items with reduced quantity
        cartItems = cartItems.map((cartItem) =>
            cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
    }

    return cartItems;
};

const clearCartItem = (cartItems, cartItemToClear) => {


    cartItems = cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


    return cartItems;
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () =>{

    },
    cartItems: [],
    addItemToCart: ()=>{


    },
    removeItemFromCart: ()=>{},
    clearItemFromCart: () =>{},
    cartCount: 0,
    cartTotal: 0,
})

const INITIAL_STATE = {
    cartCount: 0,
    cartTotal: 0,
    cartItems: [],
    isCartOpen: false,

}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS : 'SET_CART_ITEMS',
    SET_IS_CART_OPEN : 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) =>{
    const { type, payload } = action;


    switch(type){
        // reducer must not handle any business logic like addToCart ,....
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled error: ${type} of error` )
    }
}


export const CartProvider = ({children}) =>{


    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)


    const updatecartItemReducer = (newCartItems)=>{

        //generate new cart total



    const newCartTotal = newCartItems.reduce((total, cartItem)=>
    total + cartItem.quantity * cartItem.price
    ,0)



        //generate new cart count
        const newCartCount = newCartItems.reduce((total, cartItem)=>
        total + cartItem.quantity
    ,0);


        //dispatch new items iwth payload
        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}));


    }

    const addItemToCart =(productToAdd)=>{
        const newCartItems = addCartItem(cartItems, productToAdd);
        updatecartItemReducer(newCartItems)

    };

    const removeItemFromCart =(cartItemToRemove)=>{
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updatecartItemReducer(newCartItems)


    };

    const clearItemFromCart =(cartItemToClear)=>{
        const newCartItems =  clearCartItem(cartItems, cartItemToClear) ;
        updatecartItemReducer(newCartItems)


    };

    const setIsCartOpen = (bool) =>{
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,  bool));
    }

    const value = {isCartOpen, setIsCartOpen , addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};
    return(
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>

    )
}