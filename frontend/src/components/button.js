import './button.css';
import React from 'react';
import './dropdown.js';

function Button() {

    var query_details = {
        filters: {},
        outputCol: "",
        category: ""
    }

    function queryDetails() {
        query_details[filters];
    }

    return (
        <button className = "buttonShadow" onClick={sayHello}>Get Data!</button>
    ); 
}

export default Button