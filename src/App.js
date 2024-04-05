import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { useNavigate } from 'react-router-dom';
import Login from './pages/Login';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    async function sessionFlg() {
      let userId = sessionStorage.getItem("userId");
      if(userId ==null){
        setIsLoggedIn(false);
        window.location.href="http://localhost:3000/";
      }else{
        setIsLoggedIn(true);
      }
    };

  return (
    <div>
      <Router>
      {isLoggedIn && <Navbar onLogin={sessionFlg}/>}
        <Routes>
          <Route path="/" element={<Login onLogin={sessionFlg} />} />
              <Route path="/home" element={<Home onLogin={sessionFlg}/>} />
              <Route path="/profile" element={<Profile onLogin={sessionFlg} />} />
            
          </Routes>
      </Router>
    </div>
  );
}

export default App;
