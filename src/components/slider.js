import './slider.css';
import React from 'react';

function Slider() {
  // Test Input
  const inputData = [
    {'I try to get all the facts before attempting to solve a problem': 5 },
    { 'I seek out help when I need it': 3 },
    { 'It helps to talk about my feelings': 2 },
    { 'I can share my feelings with a family member or friend': 4}
  ];

  return (
    <table className="slider-container">
      {inputData.map((item, index) => {
        const key = Object.keys(item)[0];
        const value = item[key];

        const dotStyle = {
          left: `${(value - 1) * 125}px`,
          backgroundColor: '#f7df37'
        };

        const dotValueStyle = {
          color: '#ff3d00',
          textAlign: 'center',
          width: '100%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };

        return (
          <tr key={index} className="slider-item">
            {key}
            <div> 
              <hr className="slider-lines" width="500x" align="center" color="#0c4164" noshade />
              <div className="dot" style={dotStyle}>
                <span className="dot-value" style={dotValueStyle}>{value}</span>
              </div>
            </div>
          </tr>
        );
      })}
    </table>
  );
}

export default Slider;