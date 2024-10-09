import React, { useState } from 'react';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import { Signup } from './Signup';
import Wrapper from './wrapper';
import { Login } from './login';
import Errorpage from './errorpage';
import Profile from './profile';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
      <Route path = 'signup' element = {<Wrapper><Signup/></Wrapper>}/>
      <Route path = 'login' element = {<Wrapper><Login/></Wrapper>}/>
      <Route path = 'profile' element = {<Profile/>}>
      </Route>
      <Route path = "*" element = {<Errorpage/>}/>
      </Routes>
    </div>
  );
}

export default App;
