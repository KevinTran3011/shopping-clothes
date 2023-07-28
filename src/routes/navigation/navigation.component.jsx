import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../component/context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";
import './navigation.styles.scss';

const Navigation = () => {
  const {currentUser } = useContext(UserContext);

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


        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
