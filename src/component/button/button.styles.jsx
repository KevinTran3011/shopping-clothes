import styled from 'styled-components';
import { SpinnerContainer } from '../spinner/spinner.styles';

export const BasedButton = styled.button`
  /* Common styles for all screen sizes */
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  @media screen and (max-width: 480px) {
    min-width: 120px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    font-size: 14px;
  }
`;

export const GoogleSignInButton = styled(BasedButton)`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

export const InvertedButton = styled(BasedButton)`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

export const ButtonSpinner = styled(SpinnerContainer)`
width: 20px,
height: 20px,
`

