import './slider.css';
import React from 'react';

function Slider() {

  // Test Input
  const inputData = [
    {'I try to get all the facts before attempting to solve a problem': 5 },
    { 'I seek out help when I need it': 3 },
    { 'It helps to talk about my feelings': 2 }
  ];

  return (
    <table className="slider-container">
      {inputData.map((item, index) => (
        <tr key={index} className="slider-item">
          {Object.keys(item)[0]}

         <div> 
            <hr className="slider-lines"
              width="500x" 
              align="center"
              color=" #0c4164" noshade />

            <div className="dot" >
            </div>
    
         </div>
          
        </tr>
      ))}
    </table>
  );
}

export default Slider;