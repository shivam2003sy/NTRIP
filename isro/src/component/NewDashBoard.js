import React, { useState, useEffect } from 'react';
import Map from './Map';
import axios from 'axios';
import Papa from 'papaparse';
const NewDashBoard = () => {
  const id = localStorage.getItem('client');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
  const [currentMount, setCurrentMount] = useState();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);


  const handelCSVData = () => {
    console.log(tableRows);
    console.log(values);
  }

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

     
        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);


      },
    });
  };
  
  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <h1 style={{ marginBottom: "20px",
            fontFamily: "sans-serif",
            fontSize: 25,
            fontWeight: 500,
            borderBottom: "2px solid gray",
            paddingBottom: 20,
            boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.5)", }}>Dashboard</h1>
        <Map lat={latitude} long={longitude} />
      </div>
          <>
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <button
        onClick={handelCSVData}
        style={{
          display: "block",
          margin: "10px auto",
          padding: "10px 20px",
          background: "#F5F5F5",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        >
        Show Parsed Data
        </button>
            </>
    </div>
    );
    }

export default NewDashBoard;







