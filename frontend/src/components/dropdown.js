//import React from 'react';
//import '/RFAC/src/App.css';
import './dropdown.css';
import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';

function Dropdown(){

    // Multiselect code: https://primereact.org/multiselect/
    const [selectedGender, setSelectedGender] = useState(null);
    const genders = [
        { name: 'Male', code: 'Male' },
        { name: 'Female', code: 'Female' }
    ];

    const [selectedAssessmentType, setSelectedAssessmentType] = useState(null);
    const assessmentTypes = [
        { name: 'Parent', code: 'Parent' },
        { name: 'Participant', code: 'Participant' }
    ];

    const [selectedTypeLoss, setSelectedTypeLoss] = useState(null);
    const typeOfLoss = [
        { name: 'Parents\’ divorce or separation', code: 'Parents\’ divorce or separation'},
        { name: 'Death of a parent or loved one', code: 'Death of a parent or loved one' },
        { name: 'Military deployment of a parent or loved one', code: 'Military deployment of a parent or loved one'},
        { name: 'Incarceration of a parent or loved one', code: 'Incarceration of a parent or loved one'},
        { name: 'Life-threatening illness of a parent or loved one', code: 'Life-threatening illness of a parent or loved one' },
        { name: 'Abandonment of a parent or loved one', code: 'Abandonment of a parent or loved one'},
        { name: 'Deportation of a parent or loved one', code: 'Deportation of a parent or loved one'}
    ];

    const [selectedRace, setSelectedRace] = useState(null);
    const races = [
        { name: 'White or Caucasian', code: 'White or Caucasian'},
        { name: 'Hispanic or Latino', code: 'Hispanic or Latino'},
        { name: 'Black or African American', code: 'Black or African American'},
        { name: 'Multi-Racial', code: 'Multi-Racial'},
        { name: 'Asian', code: 'Asian'},
        { name: 'Native Hawaiian or Other Pacific Islander', code: 'Native Hawaiian or Other Pacific Islander'},
        { name: 'American Indian or Alaskan Native', code: 'American Indian or Alaskan Native'}
    ];

    const [selectedLevel, setSelectedLevel] = useState(null);
    const levels = [
        { name: 'Sunbeams (Pre-K)', code: 'Sunbeam' },
        { name: 'Rainbows (Grades 1-6)', code: 'Rainbow' },
        { name: 'Spectrum (Grades 7-12)', code: 'Spectrum'}
    ];

    const [selectedPrePost, setSelectedPrePost] = useState(null);
    const prePost = [
        { name: 'Pre Data', code: 'Pre' },
        { name: 'Post Data', code: 'Post' }
    ];

    return (
    
    <div className="dropdown-all">

        <div className="dropdown-gender">
            <MultiSelect value={selectedGender} onChange={(e) => setSelectedGender(e.value)} options={genders} optionLabel="name" 
            placeholder="Gender" maxSelectedLabels={3} style={{ width: "100%", height: '100%' }} />
        </div>

        <div className="dropdown-assessmentType">
            <MultiSelect value={selectedAssessmentType} onChange={(e) => setSelectedAssessmentType(e.value)} options={assessmentTypes} optionLabel="name" 
            placeholder="Assessment Type" maxSelectedLabels={3} style={{ width: "100%", height: '100%' }}/>
        </div>
        
        <div className="dropdown-typeOfLoss">
            <MultiSelect value={selectedTypeLoss} onChange={(e) => setSelectedTypeLoss(e.value)} options={typeOfLoss} optionLabel="name" 
            placeholder="Type of loss" maxSelectedLabels={3} style={{ width: "100%", height: '100%' }}/>
        </div>

        <div className="dropdown-race">
            <MultiSelect value={selectedRace} onChange={(e) => setSelectedRace(e.value)} options={races} optionLabel="name" 
            placeholder="Race/Ethnicity" maxSelectedLabels={2} style={{ width: "100%", height: '100%' }}/>
        </div>

        <div className="dropdown-level">
            <MultiSelect value={selectedLevel} onChange={(e) => setSelectedLevel(e.value)} options={levels} optionLabel="name" 
            placeholder="Assessment Level" maxSelectedLabels={1} style={{ width: "100%", height: '100%' }}/>
        </div>

        <div className="dropdown-prePost">
            <MultiSelect value={selectedPrePost} onChange={(e) => setSelectedPrePost(e.value)} options={prePost} optionLabel="name" 
            placeholder="Pre/Post Data" maxSelectedLabels={3} selectionLimit = {1} showSelectAll={false} style={{ width: "100%", height: '100%' }}/>
        </div>
    </div> );
}

export default Dropdown