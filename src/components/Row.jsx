import React from 'react';
import Box from './Box';

const Row = ({ index, blinkIndex, hasUserClicked, handleUserClickedIndex,isDisable }) => {
  
  // Function to handle click on a box
  const handleClick = (clickedIndex) => {
    // Call the handleUserClickedIndex function passed down from the Board component
    handleUserClickedIndex(clickedIndex);
  };

  return (
    <div className='row'>
      <Box
        className={`box ${blinkIndex === index ? 'blink' : ''} ${hasUserClicked === index ? 'clicked-right' : ''}`}
        index={index}
        onClick={() => handleClick(index)} // Call handleClick when the box is clicked
        isDisable={isDisable}
      />
      <Box
        className={`box ${blinkIndex === index + 1 ? 'blink' : ''} ${hasUserClicked === index + 1 ? 'clicked-right' : ''} `}
        index={index + 1}
        onClick={() => handleClick(index + 1)} // Call handleClick when the box is clicked
        isDisable={isDisable}
      />
      <Box
        className={`box ${blinkIndex === index + 2 ? 'blink' : ''} ${hasUserClicked === index + 2 ? 'clicked-right' : ''} `}
        index={index + 2}
        onClick={() => handleClick(index + 2)} // Call handleClick when the box is clicked
        isDisable={isDisable}
      />
    </div>
  );
};

export default Row;
