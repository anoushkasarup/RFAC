import './changedata.css';
import React from 'react';

function ChangeData({inputData}) {

return (
    <table className="cd-container">
      <tbody className="cd-item">
        {inputData.map((entry, index) => (
          <tr key={index}>
            <td style={{ fontSize: '30px' }}>{entry}</td>
            <br />
            <br />
            <br />
          </tr>
        ))}
      </tbody>
    </table>
    );
}

export default ChangeData