import React from 'react'

const Box = ({index,isDisable,onClick,...props}) => {

    const handleClick=()=>{
        console.log("button clicked")
    }
  return (
    <div {...props}>
      <button className='boxButton' onClick={onClick} disabled={isDisable} ></button>
    </div>
  )
}

export default Box
