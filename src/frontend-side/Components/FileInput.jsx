// FileInput.js

import React from "react";

const FileInput = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileUpload(file);
  };

  return <input type="file" accept=".csv" onChange={handleFileChange} />;
};

export default FileInput;
