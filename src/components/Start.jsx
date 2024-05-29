import React from 'react'
import memoryLogo from '../assets/memory.png'

const Start = ({onClick,...props}) => {
  const handleOnkeyPress=(event)=>{
    console.log("event.key")
    if(event.keyCode === 13){
      console.log('event.key :>> ', event.keyCode);
      onClick();
    }
  }
  return (
        <div className='container'>
            <div className='home-modal'>
        <img src={memoryLogo} alt="App logo" className='image'/>
        <h1 >Welcome to our Blink Memory Game!</h1>

        <button onClick={onClick} {...props} className='blink-me' onKeyDown={handleOnkeyPress}>Let's Start</button>
      </div>
        </div>
  ) 
}

export default Start
