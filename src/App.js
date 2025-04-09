import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import Signup from './Pages/Signup'
import HearDemo from './Pages/HearDemo'
import ContactUs from './Pages/ContactUs'
import GenerateMelody from './components/GenerateMelody/GenerateMelody';



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
          <Route path='/GenerateMelody' exact Component={GenerateMelody} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
