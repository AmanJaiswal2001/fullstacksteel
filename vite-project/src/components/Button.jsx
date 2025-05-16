import React from 'react'

const Button = ({buttonName,bgColor = 'bg-blue-500', width ,   onClick,  border,text,rounded}) => {
  return (
    // <div>
        <button 
         onClick={onClick}
         className={`btn ${bgColor}  ${border} ${width} ${text} ${rounded} font-poppins  font-semibold text-xl `}>{buttonName}</button>

    // </div>
  )
}

export default Button

