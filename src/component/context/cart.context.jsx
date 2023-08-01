import { createContext, useEffect, useState } from "react";

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
    cartCount: 0,
    clearItemFromCart: () =>{},
    cartTotal: 0,
})


export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [ cartCount, setCartCount] = useState(0);
    const [ cartTotal, setCartTotal] = useState(0);


    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=>
            total + cartItem.quantity
        ,0)
        setCartCount(newCartCount);
    
    },[cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total, cartItem)=>
            total + cartItem.quantity * cartItem.price
        ,0)
        setCartTotal(newCartTotal);
    
    },[cartItems])

    const addItemToCart =(productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd));

    };

    const removeItemFromCart =(cartItemToRemove)=>{
        setCartItems(removeCartItem(cartItems, cartItemToRemove));

    };

    const clearItemFromCart =(cartItemToClear)=>{
        setCartItems(clearCartItem(cartItems, cartItemToClear));

    };

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};
    return(
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>

    )
}