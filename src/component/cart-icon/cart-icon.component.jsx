import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../store/cart/cart.selector';
import { setIsCartOpen } from '../store/cart/cart.action';


import {CartIcons, CartIconContainer, ItemCount} from'./cart-icon.styles.jsx';

const CartIcon =()=>{

    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);

    const isCartOpen = useSelector(selectIsCartOpen);
    const toggleIsCartOpen =() => dispatch(setIsCartOpen(!isCartOpen)); 
    //set it so that it will only returns when isCartOpen = false
    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <CartIcons className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )

}


export default CartIcon;