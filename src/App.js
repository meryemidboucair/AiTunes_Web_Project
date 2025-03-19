import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Pages/Home'
import SignIn from './components/Pages/SignIn'
import Signup from './components/Pages/Signup'
import HearDemo from './components/Pages/HearDemo'
import ContactUs from './components/Pages/ContactUs'
import GetStarted from './components/Pages/GetStarted'


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/SignIn' exact Component={SignIn} />
          <Route path='/Signup' exact Component={Signup} />
          <Route path='/HearDemo' exact Component={HearDemo} />
          <Route path='/ContactUs' exact Component={ContactUs} />
          <Route path='/GetStarted' exact Component={GetStarted} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
