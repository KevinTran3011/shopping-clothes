import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { CartContext } from "../../component/context/cart.context";
import { UserContext } from "../../component/context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import  {NavigationContainer, LogoContainer, NavLink, NavLinkContainer} from './navigation.styles.jsx';

const Navigation = () => {
  const {currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <div>
            <CrwnLogo className="logo" /> 
          </div>
        </LogoContainer>
        <NavLinkContainer>
          <NavLink className='nav-link' to='/shop'>     
            Shop
          </NavLink>

          {
            currentUser ? 
              (<NavLink onClick={signOutUser}>SIGN OUT</NavLink>) :( <NavLink className='nav-link' to='/auth'>
                                                            Sign In
                                                          </NavLink>)
            
          } 

              <CartIcon/>

          


        </NavLinkContainer>
        {isCartOpen && <CartDropdown/>}

      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
