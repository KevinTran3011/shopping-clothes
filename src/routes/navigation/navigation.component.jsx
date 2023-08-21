import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
// import { CartContext } from "../../component/context/cart.context";
import { selectIsCartOpen } from "../../component/store/cart/cart.selector";
// import { signOutUser } from "../../utils/firebase/firebase.util";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import  {NavigationContainer, LogoContainer, NavLink, NavLinkContainer} from './navigation.styles.jsx';
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../component/store/user/user.selector";
import { signOutStart } from "../../component/store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  // const { isCartOpen } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);
  console.log('Navigation component rendered');
  console.log('currentUser:', currentUser);


  const handleSignOut = async () => {
    try {
      await signOutUser();
      // Perform any additional actions upon successful sign-out if needed
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const signOutUser =()=>dispatch(signOutStart())

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
              (<NavLink onClick={handleSignOut}>SIGN OUT</NavLink>) :( <NavLink className='nav-link' to='/auth'>
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
