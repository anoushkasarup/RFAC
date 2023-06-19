//import React from 'react';
//import '/RFAC/src/App.css';
import './dropdown.css';
import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';
import Button from './button.js';
import Pie from './piechart.js';
import Slider from './slider.js';
import ChangeData from './changedata.js';

var query_details = {
    filters: {Gender: "", RaceEthnicity: "", TypeLoss: ""},
    outputCol: "",
    category: "",
    time: "", 
    person: "", 
}

export function Dropdown(){

    // Multiselect code: https://primereact.org/multiselect/
    const [selectedGender, setSelectedGender] = useState(null);
    const genders = ['Male','Female' ];

    const [selectedAssessmentType, setSelectedAssessmentType] = useState(null);
    const assessmentTypes = ['Parent','Participant'];

    const [selectedTypeLoss, setSelectedTypeLoss] = useState(null);
    const typeOfLoss = ['Parents\’ divorce or separation','Death of a parent or loved one',
    'Military deployment of a parent or loved one', 'Incarceration of a parent or loved one',
    'Life-threatening illness of a parent or loved one', 'Abandonment of a parent or loved one',
    'Deportation of a parent or loved one'];

    const [selectedRace, setSelectedRace] = useState(null);
    const races = ['White or Caucasian','Hispanic or Latino',
        'Black or African American','Multi-Racial','Asian',
        'Native Hawaiian or Other Pacific Islander','American Indian or Alaskan Native'];

    const [selectedLevel, setSelectedLevel] = useState(null);
    const levels = ['Sunbeam','Rainbow','Spectrum'];

    const [selectedPrePost, setSelectedPrePost] = useState(null);
    const prePost = ['Pre','Post','Change'];

    const [selectedOutputCol, setSelectedOutputCol] = useState(null);
    const outcol = [
        { name: 'School Performance', code: 'SchoolPerformance'},
        { name: 'Personal Behavior', code: 'PersonalBehavior' },
        { name: 'Group Behavior', code: 'GroupBehavior'}, 
        { name: 'Parent Relation', code: 'ParentRelation'},
        { name: 'Feedback', code: 'Feedback'},
        { name: 'Aggregate Data', code: 'AggregateData'},
    ];

    const d1 = ['Helping others can help me too: 0.37',
    'Hurting myself does not help me: 0.28',
    'Hurting others does not help me: 0.13',
    'I am happy most or all of the time: 0.32',
    'I am proud of who I am: 0.21',
    'I am stress-free most or all of the time: 0.4',
    'I ask for help when I need it: 0.18',
    'I can go through hard times and still be okay: 0.3',
    'I can tell someone in my family or a friend how I feel: 0.13',
    'I feel loved: 0.19',
    'I have gifts/talents to offer the world: 0.2',
    'I know some healthy ways to be less angry/stressed: 0.41',
    'It helps to talk about my feelings: 0.43',
    'It is easy for me to say sorry: 0.25',
    'It is good to have friends: 0.09',
    'Trying to feel happy, even when I am not, can help me: 0.13',
    'What happened is not my fault: 0.27',
    'When I have a problem, I think of what is true and what is not true: 0.28'];

    const d2 = [{'My child has been attending school regularly during the time he or she has been in Rainbows': 5.00},
    {'My child has demonstrated good behavior in school during the time he or she has been in Rainbows': 3.82}];

    const d3 = [{'Black or African American': 17},
    {'Hispanic or Latino': 8},
    {'Multi-Racial': 1},
    {'White or Caucasian': 7}];

    const [iData, setiData] = useState([]);

    const [showCd, setShowCd] = useState(false);
    const [showSlider, setShowSlider] = useState(false);
    const [showPie, setShowPie] = useState(false);

     const handleButtonClick = () => {
        setShowCd(selectedPrePost.includes('Change') && !(selectedOutputCol.includes('AggregateData')));
        setShowPie(selectedOutputCol.includes('AggregateData'));
        setShowSlider(!(selectedPrePost.includes('Change') || selectedOutputCol.includes('AggregateData')));
        query_details.filters.Gender = selectedGender;
        query_details.filters.RaceEthnicity = selectedRace;
        query_details.filters.TypeLoss = selectedTypeLoss;
        query_details.outputCol = selectedOutputCol;
        query_details.category = selectedLevel;
        query_details.time = selectedPrePost;
        query_details.person = selectedAssessmentType;
        fetch('/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(query_details),
          })
            .then(response => {
                if (response.ok){
                    response.json(); 
                    console.log("Request successful");
                }
                else {
                    console.error("Request failed");
                }
            })
            .catch(error => {
              console.error('Error while sending data: ', error);
            });
        fetch('/', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              }
        })
        .then(response => response.json())
        .then(response => {
            setiData(response); 
            console.log("Data retrieval successful");
        })
        .catch(error => {
            console.error("Error while retrieving data: ", error);
        });
    };

    return (
    
    <div className="dropdown-all">

        <div className="dropdown-gender">
            <MultiSelect value={selectedGender} onChange={(e) => setSelectedGender(e.value)} options={genders} 
            placeholder="Gender" maxSelectedLabels={3} style={{ width: "100%", height: '100%' }} />
        </div>

        <div className="dropdown-assessmentType">
            <MultiSelect value={selectedAssessmentType} onChange={(e) => setSelectedAssessmentType(e.value)} options={assessmentTypes}  
            placeholder="Assessment Type" maxSelectedLabels={3} style={{ width: "100%", height: '100%' }}/>
        </div>
        
        <div className="dropdown-typeOfLoss">
            <MultiSelect value={selectedTypeLoss} onChange={(e) => setSelectedTypeLoss(e.value)} options={typeOfLoss} 
            placeholder="Type of loss" maxSelectedLabels={3} style={{ width: "100%", height: '100%' }}/>
        </div>

        <div className="dropdown-race">
            <MultiSelect value={selectedRace} onChange={(e) => setSelectedRace(e.value)} options={races} 
            placeholder="Race/Ethnicity" maxSelectedLabels={2} style={{ width: "100%", height: '100%' }}/>
        </div>

        <div className="dropdown-level">
            <MultiSelect value={selectedLevel} onChange={(e) => setSelectedLevel(e.value)} options={levels}  
            placeholder="Assessment Level" maxSelectedLabels={1} style={{ width: "100%", height: '100%' }}/>
        </div>

        <div className="dropdown-prePost">
            <MultiSelect value={selectedPrePost} onChange={(e) => setSelectedPrePost(e.value)} options={prePost}  
            placeholder="Pre/Post Data" maxSelectedLabels={3} selectionLimit = {1} showSelectAll={false} style={{ width: "100%", height: '100%' }}/>
        </div>
        <div className="dropdown-outputCol">
            <MultiSelect value={selectedOutputCol} onChange={(e) => setSelectedOutputCol(e.value)} options={outcol} optionLabel="name" optionValue="code"
            placeholder="Output Column" maxSelectedLabels={1} selectionLimit = {1} showSelectAll={false} style={{ width: "100%", height: '100%' }}/>
        </div>
        <button className = "buttonShadow" onClick={handleButtonClick}>Get Data!</button>
        {showCd && <ChangeData inputData={iData} />}
        {showSlider && <Slider inputData={iData} />}
        {showPie && <Pie inputData={iData} />}

    </div> );
}

export default Dropdown