import './check-out.styles.scss';
import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../component/store/cart/cart.selector';
import CartItem from '../../component/cart-item/cart-item.component';
import CheckoutItem from '../../component/checkout-item/checkout-item.component';
import PaymentForm from '../../component/payment-form/payment-form.component';

const CheckOut = ()=>{
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
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
                <PaymentForm/>

            


            </div>
        </div>
    )
    

}


export default CheckOut;