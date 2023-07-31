

import './cart-item.styles.scss';


const CartItem =({cartItem})=>{
    const {name, quantity, price, imageUrl} = cartItem;
    return(
        <div className='cart-item-container' alt = {`${name}`}>
            <div className='item-details'>
                <img src = {imageUrl}/>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price}</span>


            </div>

        </div>
    )

}

export default CartItem;