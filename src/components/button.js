import './button.css';
import React from 'react';

function Button() {

    function sayHello() {
        alert('Getting data visualizations');
    }

    return (
        <button className = "buttonShadow" onClick={sayHello}>Get Data!</button>
    ); 
}

export default Button