import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../context/cart.context';



import {CartIcons, CartIconContainer, ItemCount} from'./cart-icon.styles.jsx';

const CartIcon =()=>{
    const { isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const toggleIsCartOpen =() => setIsCartOpen(!isCartOpen); 
    //set it so that it will only returns when isCartOpen = false
    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <CartIcons className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )

}


export default CartIcon;