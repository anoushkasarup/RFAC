import './fileupload.css';
import React, { useState, useRef } from 'react';
import axios from 'axios';

// https://www.filestack.com/fileschool/react/react-file-upload/
function Fileupload() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [showUploadButton, setShowUploadButton] = useState(true);

  function handleChange(event) {
    setFile(event.target.files[0]);
    setShowUploadButton(true)
  }

  function handleSubmit(event) {
    event.preventDefault();

    // ChatGPT code for file contents as string
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileContents = e.target.result;
      
      console.log(fileContents);
      console.log(typeof fileContents);
      setFile(null);
      setShowUploadButton(false);
    };
    reader.readAsText(file); // Read the file as text

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
      setShowUploadButton(false);
    });
  }

  function clearFile() {
    fileInputRef.current.value = '';
  }

  return (
    <div className="test">
      <p>
        <u>Upload csv files:</u>
      </p>
      <form onSubmit={handleSubmit}>
        <input ref={fileInputRef} className="upload_button" type="file" onChange={handleChange} />
        {file && showUploadButton && (
          <button onClick={clearFile} className="submit_button buttonShadow" type="submit">
            Upload
          </button>
        )}
      </form>
    </div>
  );
}

export default Fileupload;
