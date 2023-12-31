import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvReader = () => {
  const [csvData, setCsvData] = useState([])

  const [data  , setData] = useState([])

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      complete: (result) => {
        // The parsed CSV data is available in the `result` object
        console.log('Parsed CSV:', result);
        setCsvData(result.data);
        // parse data to json
        const data = result.data;
        const headers = data[0];
        const rows = data.slice(1);
        const json = rows.map((row) => {
          return headers.reduce(
            (object, header, index) => ({ ...object, [header]: row[index] }),
            {}
          );
        });
        setData(json);
        console.log(json);
      },
      header: true, // If your CSV file has a header row
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <h2>CSV Data:</h2>
      <ul>
        {csvData.map((row, index) => (
          <li key={index}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </div>
  );
};

export default CsvReader;
