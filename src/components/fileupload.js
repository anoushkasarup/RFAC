import './fileupload.css';
import React, {useState} from 'react';
import axios from 'axios';

// template code for fileupload: https://www.filestack.com/fileschool/react/react-file-upload/
function Fileupload() {

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

  }

  return (
    <div className="App">
      <p>
        <u>Upload csv files:</u>
      </p>
      {/* Code for hiding submit button until a file is uploaded from ChatGPT*/}
      <form onSubmit={handleSubmit}>
        <input className="upload_button" type="file" onChange={handleChange} />
        {file && (
          <button className="submit_button buttonShadow" type="submit">
            Upload
          </button>
        )}
      </form>
    </div>
  );
}

export default Fileupload;