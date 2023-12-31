
//craeted a syled div instead of the  traditional scss/css files. This is basically react compinent but for css/scss

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  align-items: center;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 22px;
  
    text-decoration: none;
    color: black;
  
`;
