import React from 'react';
import { Link } from 'react-router-dom'; 
import '../../App.css';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/v4.mp4' autoPlay loop muted className="hero-video" />
      <h1>LET CREATIVITY FLOW YOUR AI-GENERATED MASTERPIECE AWAITS!</h1>
      <p>What are you waiting for?</p>

      <div className='hero-btns'>
        <div className='btn-container'>
          <Link to="/GetStarted">
            <i className='fas fa-play-circle btn-icon' />
            <p>Get Started</p>
          </Link>
        </div>

        <div className='btn-container'>
          <Link to="/HearDemo">
            <i className='fas fa-headphones-alt btn-icon' />
            <p>Hear a Demo</p>
          </Link>
        </div>
      </div> 
    </div> 
  );
}

export default HeroSection;
