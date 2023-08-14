import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../../utils/reducer/reducer.utils";

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

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
    
export const addItemToCart =(cartItems, productToAdd)=>{
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)

};

export const removeItemFromCart =(cartItems, cartItemToRemove)=>{
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)


};

export const clearItemFromCart =(cartItems, cartItemToClear)=>{
    const newCartItems =  clearCartItem(cartItems, cartItemToClear) ;
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)


};