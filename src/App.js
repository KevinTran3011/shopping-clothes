import { Routes, Route } from 'react-router-dom';
import SignIn from './routes/Sign-in/authentication.component';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.util";
import { setCurrentUser } from './component/store/user/user.action';

import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import CheckOut from './routes/check-out/check-out.component';

const App = () => {
  const dispatch = useDispatch();
  
// Inside your App component's useEffect

useEffect(() => {
  const unsubscribe = onAuthStateChangedListener((user) => {
    if (user) {
      createUserDocumentFromAuth(user);
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        // Add other necessary properties
      };
      dispatch(setCurrentUser(userData));
    } else {
      dispatch(setCurrentUser(null));
    }
  });

  return unsubscribe;
}, []);


  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<SignIn />} />
        <Route path='checkout' element={<CheckOut />} />
      </Route>
    </Routes>
  );
}

export default App;
