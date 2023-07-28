import {Routes, Route, Outlet} from 'react-router-dom';
import SignIn from './routes/Sign-in/authentication.component';

import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';



const App = () => {
      return(
        <Routes>
          <Route path = '/' element = {<Navigation/>}>
              <Route index element = {<Home />}/>
              <Route path = 'shop' element = {<Shop/>} />
              <Route path = 'auth' element = {<SignIn />}/>

          </Route>

        </Routes>
      ) ;
}

export default App;
