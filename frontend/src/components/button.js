import './button.css';
import React from 'react';

function Button({onClickFunction}) {
    
    return (
        <button className = "buttonShadow" onClick={onClickFunction}>Get Data!</button>
    ); 
}

export default Button