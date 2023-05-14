import rfaclogo from './RAC_Logo_Secondary_FullColor.png';
import './App.css';
import Dropdown from './components/dropdown.js';
import Button from './components/button.js';
import React, { useState } from "react";

function App(){

  return (
    <div className="App">
        <header className="App-header">

            <img src={rfaclogo} className="App-logo" alt="rfaclogo" />
            <div class="vl"></div>
            <h1>Data Visualizer</h1>

            <Dropdown/>
            <Button />
         
            <hr width="95%" 
                align="center"
                size="10"  
                color=" #0c4164" noshade />

        </header>
    </div>
  );
}

export default App;
