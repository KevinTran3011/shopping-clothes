import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'tachyons';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  store, { persistor} from './component/store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading = {null} persistor = {persistor}>

        <BrowserRouter>
            {/* Product provider placed inside user provider so that products can access user's information */}
            <Elements stripe = {stripePromise}>

              <App />


            </Elements>
        </BrowserRouter>


      </PersistGate>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
