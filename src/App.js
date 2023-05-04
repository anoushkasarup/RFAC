import rfaclogo from './RAC_Logo_Secondary_FullColor.png';
import './App.css';

import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';


function App(){

  // Multiselect code: https://primereact.org/multiselect/
  const [selectedGender, setSelectedGender] = useState(null);
    const genders = [
        { name: 'Male', code: 'M' },
        { name: 'Female', code: 'F' }
    ];

  const [selectedAssessmentType, setSelectedAssessmentType] = useState(null);
    const assessmentTypes = [
        { name: 'Parent', code: 'Prnt' },
        { name: 'Participant', code: 'Part' },
        { name: 'Faciliator', code: 'Fac'}
    ];

  const [selectedTypeLoss, setSelectedTypeLoss] = useState(null);
    const typeOfLoss = [
        { name: 'Divorce', code: 'D' },
        { name: 'Death of Parent', code: 'Death' }
    ];

  const [selectedRace, setSelectedRace] = useState(null);
    const races = [
        { name: 'White or Caucasian', code: 'white' },
        { name: 'Hispanic or Latino', code: 'hispanic/latino' },
        { name: 'Black or African American', code: 'black/africanAmerican'}
    ];

  const [selectedLevel, setSelectedLevel] = useState(null);
    const levels = [
        { name: 'Sunbeams (Pre-K)', code: 'sunbeams' },
        { name: 'Rainbows (Grades 1-6)', code: 'rainbows' },
        { name: 'Spectrum (Grades 7-12)', code: 'spectrum'}
    ];

  const [selectedPrePost, setSelectedPrePost] = useState(null);
    const prePost = [
        { name: 'Pre Data', code: 'pre' },
        { name: 'Post Data', code: 'post' }
    ];

    function sayHello() {
      alert('Getting data visualizations');
    }
   

  return (
    <div className="App">
      <header className="App-header">

      <img src={rfaclogo} className="App-logo" alt="rfaclogo" />
      <div class="vl"></div>
      <h1>Data Visualizer</h1>


      <div className="dropdown-all"> 

        <div className="dropdown-gender">
            <MultiSelect value={selectedGender} onChange={(e) => setSelectedGender(e.value)} options={genders} optionLabel="name" 
                placeholder="Gender" maxSelectedLabels={3} className="w-full md:w-20rem" />
        </div>

        <div className="dropdown-assessmentType">
            <MultiSelect value={selectedAssessmentType} onChange={(e) => setSelectedAssessmentType(e.value)} options={assessmentTypes} optionLabel="name" 
                placeholder="Assessment Type" maxSelectedLabels={3} className="w-full md:w-20rem" />
        </div>

        <div className="dropdown-typeOfLoss">
            <MultiSelect value={selectedTypeLoss} onChange={(e) => setSelectedTypeLoss(e.value)} options={typeOfLoss} optionLabel="name" 
                placeholder="Type of loss" maxSelectedLabels={3} className="w-full md:w-20rem" />
        </div>

        <div className="dropdown-race">
            <MultiSelect value={selectedRace} onChange={(e) => setSelectedRace(e.value)} options={races} optionLabel="name" 
                placeholder="Race/Ethnicity" maxSelectedLabels={2} className="w-full md:w-20rem" />
        </div>

        <div className="dropdown-level">
            <MultiSelect value={selectedLevel} onChange={(e) => setSelectedLevel(e.value)} options={levels} optionLabel="name" 
                placeholder="Assessment Level" maxSelectedLabels={1} className="w-full md:w-20rem" />
        </div>

        <div className="dropdown-prePost">
            <MultiSelect value={selectedPrePost} onChange={(e) => setSelectedPrePost(e.value)} options={prePost} optionLabel="name" 
                placeholder="Pre/Post Data" maxSelectedLabels={3} className="w-full md:w-20rem" />
        </div>
       </div>

       <button class = "buttonShadow" onClick={sayHello}>Get Data!</button>
       
       <hr width="95%" 
        align="center"
        size="10"  
        color=" #0c4164" noshade />

      </header>

    </div>
  );
}

export default App;
