import { Routes, Route } from 'react-router-dom';
import SignIn from './routes/Sign-in/authentication.component';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { setCurrentUser } from './component/store/user/user.action';
import { checkUserSession } from './component/store/user/user.action';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.util';
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import CheckOut from './routes/check-out/check-out.component';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      const pickedUser = user && (({accessToken, email})=> ({accessToken, email}))(user);
      dispatch(setCurrentUser(pickedUser));
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
