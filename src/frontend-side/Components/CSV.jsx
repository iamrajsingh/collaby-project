// CSV.js

import React from "react";
import Papa from "papaparse";
import FileInput from "./FileInput";

const CSV = () => {
  const handleFileUpload = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        //console.log(result.data); // Access parsed data here
      },
      header: true, // Set to true if your CSV has headers
    });
  };

  return (
    <div>
      <h1>CSV Reader</h1>
      <FileInput onFileUpload={handleFileUpload} />
    </div>
  );
};

export default CSV;
