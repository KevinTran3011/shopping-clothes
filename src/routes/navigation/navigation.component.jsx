import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import './navigation.styles.scss';

const Navigation = () => {
  return (
    <Fragment>
      <div className='navigation'>
        <Link className="logo-container" to='/'>
          <div>
            <CrwnLogo className="logo" /> {/* Fixed 'clasName' to 'className' */}
          </div>
        </Link>
        <div className='link-container'>
          <Link className='nav-link' to='/shop'>
            Shop
          </Link>

          <Link className='nav-link' to='/sign-in'>
            Sign In
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
