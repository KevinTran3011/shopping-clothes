import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { CartContext } from "../../component/context/cart.context";
import { UserContext } from "../../component/context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import './navigation.styles.scss';

const Navigation = () => {
  const {currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className='navigation'>
        <Link className="logo-container" to='/'>
          <div>
            <CrwnLogo className="logo" /> 
          </div>
        </Link>
        <div className='link-container'>
          <Link className='nav-link' to='/shop'>
            Shop
          </Link>

          {
            currentUser ? 
              (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>) :( <Link className='nav-link' to='/auth'>
                                                            Sign In
                                                          </Link>)
            
          } 

              <CartIcon/>

          


        </div>
        {isCartOpen && <CartDropdown/>}

      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
