import './check-out.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../component/context/cart.context';
import CartItem from '../../component/cart-item/cart-item.component';
import CheckoutItem from '../../component/checkout-item/checkout-item.component';


const CheckOut = ()=>{
    const {cartItems, cartTotal} = useContext(CartContext)
    return(
        <div className='checkout-container'>

            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>

                </div>

                <div className='header-block'>
                    <span>Description</span>

                </div>

                
                <div className='header-block'>
                    <span>Quantity</span>

                </div>


                <div className='header-block'>
                    <span>Price</span>

                </div>


                <div className='header-block'>
                    <span>Remove</span>

                </div>




            </div>
            <div>

                {cartItems.map((cartItem)=>{
                    return(
                            <CheckoutItem key ={cartItem.id} cartItem={cartItem}/>
                    )


                })}
                <span className='total'>Total: $ {cartTotal}</span>

            


            </div>
        </div>
    )
    

}


export default CheckOut;