import './piechart.css';
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function Pie() {
  // Transform input code and getting random color from ChatGPT
  function transformInput(input) {
    var output = [];
    for (var i = 0; i < input.length; i++) {
      var dictionary = input[i];
      var key = Object.keys(dictionary)[0];
      var value = dictionary[key];
      var color = getRandomColor();
      var newDict = { title: key, value: value, color: color };
      output.push(newDict);
    }
    return output;
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Test Input
  const inputData = [
    { 'One': 5 },
    { 'Two': 15 },
    { 'Three': 20 },
    { 'Four': 12 }
  ];

  // Calculate total value
  const totalValue = inputData.reduce((total, entry) => total + Object.values(entry)[0], 0);

  // Transform data
  const data = transformInput(inputData);

  // Note: Piechart will only label values on the pie chart that are more than 10% of the total
  //       This is to avoid a thin section with overflowing words
  return (
    <div>
      <div className="pie-container">
        <PieChart
          data={data}
          radius={50}
          center={[50,50]}
          viewBoxSize={[100,100]}
          label={({ dataEntry }) =>
            dataEntry.value > 0.1 * totalValue ? `${dataEntry.title}: ${dataEntry.value}` : ''
          }
          labelPosition={60}
          labelStyle={{
            fontSize: '4px',
            fontFamily: 'sans-serif',
            fill: '#FFFFFF',
          }}
        />
      </div>
      <div className="pie-legend">
        {data.map((dataEntry, index) => (
          <div key={index}>
            <span
              style={{ backgroundColor: dataEntry.color }}
            ></span>
            <span
              style={{ color: dataEntry.color }}
            >{`${dataEntry.title}: ${dataEntry.value}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pie;