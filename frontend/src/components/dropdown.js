//import React from 'react';
//import '/RFAC/src/App.css';
import './dropdown.css';
import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';

function Dropdown(){

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
        { name: 'Parents’ divorce or separation', code: 'divorce' },
        { name: 'Death of a parent or loved one', code: 'death' },
        { name: 'Military deployment of a parent or loved one', code: 'military' },
        { name: 'Incarceration of a parent or loved one', code: 'incarceration' },
        { name: 'Life-threatening illness of a parent or loved one', code: 'illness' },
        { name: 'Abandonment of a parent or loved one', code: 'abandonment' },
        { name: 'Deportation of a parent or loved one', code: 'deportation' }
    ];

    const [selectedRace, setSelectedRace] = useState(null);
    const races = [
        { name: 'White or Caucasian', code: 'white' },
        { name: 'Hispanic or Latino', code: 'hispanic/latino' },
        { name: 'Black or African American', code: 'black/africanAmerican'},
        { name: 'Multi-Racial', code: 'multi-racial'},
        { name: 'Asian', code: 'asian'},
        { name: 'Native Hawaiian or Other Pacific Islander', code: 'nativehawaiin'},
        { name: 'American Indian or Alaskan Native', code: 'americanIndian'}
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