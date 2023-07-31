import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { UserProvider } from './component/context/user.context';
import { BrowserRouter } from 'react-router-dom';
import 'tachyons';
import App from './App';
import { ProductProvider } from './component/context/product.context';
import { CartProvider } from './component/context/cart.context';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider> 
          {/* Product provider placed inside user provider so that products can access user's information */}
          <CartProvider>

          <App />



          </CartProvider>



        </ProductProvider>


      </UserProvider>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
