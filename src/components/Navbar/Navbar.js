import { useEffect, useState } from 'react' 
import React from 'react'
import { Link } from "react-router-dom";
import './Navbar.css';
import {Button} from '../Button/Button';


function Navbar  () {
  const [click,setClick]=useState(false);

  const handleClick =() => setClick(!click);

  const closeMobileMenu=() => setClick(false);

  const [button,setButton]=useState(true);

  const showButton =()=>{
    if (window.innerWidth<= 960){
      setButton(false);

    }else{
      setButton(true);
    }

  };

  useEffect(()=>{
    showButton();
  },[]);

  window.addEventListener('resize',showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>  {}
            AiTunes <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times':'fas fa-bars'}/>
          </div>

          <ul className={click ? 'nav-menu active':'nav-menu'}>
            <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            Home
            </Link>
            </li>

            <li className='nav-item'>
            <Link to='/ContactUs' className='nav-links' onClick={closeMobileMenu}>
            Contact us
            </Link>
            </li>
            <li className='nav-item'>
            <Link to='/SignIn' className='nav-links' onClick={closeMobileMenu}>
            Sign in
            </Link>
            </li>
            <li className='nav-item'>
            <Link to='/Signup' className='nav-links' onClick={closeMobileMenu}>
            Sign up
            </Link>
            </li>
        
          </ul>
          </div>
      </nav>
    </>
  )
}

export default Navbar
