import React from 'react';
import '../../App.css';
import {Button} from '../Button/Button';
import './HeroSection.css';

function HeroSection() {
  
  return (
    <div className='hero-container'>
      <video src='/videos/Video.mp4' autoPlay loop muted />
      <h1>LET CREATIVITY FLOW YOUR AI-GENERATED MASTERPIECE AWAITS !</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          HEAR A DEMO <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;