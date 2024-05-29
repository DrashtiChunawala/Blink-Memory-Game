import React, { useState, useEffect,useRef } from 'react';
import './Board.css';
import memoryLogo from '../assets/memory.png';
import sideImage from '../assets/side_image.jpg';
import Row from './Row';
import Modal from './Modal';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let shuffledArray = array.sort((a, b) => 0.5 - Math.random());

const Board = ({handleStart}) => {
  const modalRef = useRef();
  const [isDisable, setIsDisable] = useState(false);
    const [blinkIndex, setBlinkIndex] = useState([]);
    const [trueIndex, setTrueIndex] = useState(0);
    const [userClicks, setUserClicks] = useState([]);
    const [isReset, setIsReset] = useState(false);
    const[hasUserClicked, setHasUserClicked] = useState(false); 
    const [modalMessage, setModalMessage] = useState({});
    let blinkTimeout = null;


    //handle reset function
    const handleReset = () => {
        setTrueIndex(0);
        setBlinkIndex([]);
        setUserClicks([]);
        setIsDisable(false);
        clearTimeout(blinkTimeout);
        shuffledArray = array.sort((a, b) => 0.5 - Math.random());
        handleStart();
    }


    const handleEndGame = () => {
      modalRef.current.closeModal();
      setIsReset(true);
    }
    const handlePlayAgain = () => {
      modalRef.current.closeModal();
    }
    // Function to handle user clicks
const handleUserClickedIndex = (clickedIndex) => {
  // Check for wrong click before updating user clicks
  if (blinkIndex.length > 0 && clickedIndex !== blinkIndex[userClicks.length]) {
   
      // alert('User lost the game!');
      setModalMessage(()=>({
        title:'You lost the game!',
        message: 'You clicked wrong one. Better luck next time!',
      }))
      modalRef.current.openModal();
      // setIsReset(true);
      setIsDisable(true);
      clearTimeout(blinkTimeout);
      return;
  }

  setUserClicks((prevClicks) => {
      let userArray;
      if (prevClicks.length === blinkIndex.length) {
          userArray = [...prevClicks];
          setIsReset(true);
          setIsDisable(true);
      } else {
          userArray = [...prevClicks, clickedIndex];
          console.log('userArray :>> ', userArray);
      }
      return userArray;
  });
  setHasUserClicked(clickedIndex);
};


    // Function to handle blinking
    const handleBlinkedIndex = () => {
      
        setBlinkIndex((prevArray) => {
            let newArray;
            if (prevArray[prevArray.length - 1] === shuffledArray[trueIndex]) {
                newArray = [...prevArray];
              } else {
                newArray = [...prevArray, shuffledArray[trueIndex]];
              }
              console.log('actual array :>> ', newArray);
            return newArray;
        });
        setIsDisable(false);  
        
        blinkTimeout = setTimeout(() => {
            setTrueIndex((prev) => prev + 1);
           
        }, 10000);
    };

     useEffect(() => {
      if (trueIndex < shuffledArray.length) {
          if(userClicks.length === blinkIndex.length) {
              handleBlinkedIndex();
              setUserClicks([]);
              return () => clearTimeout(blinkTimeout);
          } else if ( !userClicks.includes(blinkIndex[trueIndex - 1])) {
              setModalMessage(() => ({
                  title: 'Times Up!!!',
                  message: 'You lost the game!',
              }));
              modalRef.current.openModal();
              setIsDisable(true);
              clearTimeout(blinkTimeout);
          }
      }
      if (JSON.stringify(userClicks) === JSON.stringify(blinkIndex)) {
        setModalMessage(() => ({
          title: 'Congratulations!!!',
          message: 'You Won the game!',
      }));
      modalRef.current.openModal();
          // setIsReset(true);
      }
  }, [trueIndex]);
  

    useEffect(() => {
      if(isReset){
        handleReset();
      }
    },[isReset]);
    return (
        <>
        <Modal ref={modalRef} handleEndGame={handleEndGame}>
          <h2>{modalMessage?.title}</h2>
          <p>{modalMessage?.message}</p>
        </Modal>
            <div className="title">
                <img src={memoryLogo} alt="App logo" />
                <h1>Blink Memory Game</h1>
            </div>
            <div className="board">
                <Row isDisable={isDisable} index={1} blinkIndex={blinkIndex[trueIndex]} handleUserClickedIndex={handleUserClickedIndex} hasUserClicked={hasUserClicked} />
                <Row isDisable={isDisable} index={4} blinkIndex={blinkIndex[trueIndex]} handleUserClickedIndex={handleUserClickedIndex} hasUserClicked={hasUserClicked}/>
                <Row isDisable={isDisable} index={7} blinkIndex={blinkIndex[trueIndex]} handleUserClickedIndex={handleUserClickedIndex} hasUserClicked={hasUserClicked}/>
            </div>
            <button className="reset" onClick={handleReset}>Restart</button>
            <img src={sideImage} alt="side-Image" className="side-image" />
        </>
    );
};

export default Board;
