import React, { useState, useEffect } from 'react';
import Map from './Map';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Papa from 'papaparse';
const Dashboard = () => {


  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('{"type": "message", "message": "Hello World"}');
  const id = localStorage.getItem('client');
  const [currentMount, setCurrentMount] = useState();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const ConnectToServer = async (serverId) => {
    try {
      const newSocket = new WebSocket(`ws://192.168.123.120:8000/ws/${serverId}/server/`);
      newSocket.addEventListener('open', (event) => {
        console.log('WebSocket connection opened:', event);
      });
      socket.send(JSON.stringify({
        lat: latitude,
        lon: longitude,
        connection_type: "client",
        id: id,
      }));
      newSocket.addEventListener('message', (event) => {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      });
      newSocket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
      });
      setSocket(newSocket);
      const updateConnectStatus = async () => {
        try {
          const response = await axios.patch(`http://192.168.123.120:8000/update-status-client/${id}`,{
            is_active: true,
          })
          console.log(response.data);
        }
        catch (error) {
          console.error(error);
        }
      }
      updateConnectStatus()
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleWebSocketConnect = (id) => {
    const newSocket = new WebSocket(`ws://192.168.123.120:8000/ws/${id}/server/`);

    newSocket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened:', event);
    });

    newSocket.addEventListener('message', (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    });

    newSocket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event);
    });

    setSocket(newSocket);
  };


  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);

  const handelDisconnect = async () => {
    try {
      const response = await axios.patch(`http://192.168.123.120:8000/update-status-client/${id}`,{
        is_active: false,
      })
      console.log(response.data);
    }
    catch (error) {
      console.error(error);
    }
    socket.close();
    console.log('socket closed');
  }


  const handleFileUpload = (e) => {
    const file = e.target.files[0]

    Papa.parse(file, {
      complete: (result) => {
        // The parsed CSV data is available in the `result` object
        // console.log('Parsed CSV:', result);
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        result.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(result.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
      header: true, // If your CSV file has a header row
    });
  };



  const [available ,  setAvailable] = useState([]);
  const getNearestServer = async () => {
    try {
      const response = await axios.post('http://192.168.123.120:8000/nearest-server', {
        lat: 10,
        lon: 10,
        id: id,
      });
      console.log(response.data);
      setCurrentMount(response.data.id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  const handelInitialdata = async () => {

   
    handleWebSocketConnect(currentMount);

    getNearestServer();


    const updateConnectStatus = async () => {
      try {
        const response = await axios.patch(`http://192.168.123.120:8000/update-status-client/${id}`,{
          is_active: true,
        })
        console.log(response.data);
      }
      catch (error) {
        console.error(error);
      }
    }
    updateConnectStatus();
  }








  useEffect(() => {

    const getAllServer = async () => {
      try {
        const response = await axios.get('http://192.168.123.120:8000/get-all-server-caster');
        console.log(response.data);
        setAvailable(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllServer();



    // const getNearestServer = async () => {
    //   try {
    //     const response = await axios.post('http://192.168.123.120:8000/nearest-server', {
    //       lat: 72,
    //       lon: 23,
    //       id: id,
    //     });
    //     console.log(response.data);
    //     setCurrentMount(response.data.id);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false); 
    //   }
    // };

    // const successCallback = (position) => {
    //   setLatitude(position.coords.latitude);
    //   setLongitude(position.coords.longitude);
    //   // setLatitude(88)
    //   // setLongitude(87)
    // };

    // const errorCallback = (error) => {
    //   console.error(error.code, error.message);
    // };

    // Geolocation.getCurrentPosition(successCallback, errorCallback, {
    //   enableHighAccuracy: true,
    //   maximumAge: 10000,
    // });

    handleWebSocketConnect(currentMount);

    getNearestServer();


    const updateConnectStatus = async () => {
      try {
        const response = await axios.patch(`http://192.168.123.120:8000/update-status-client/${id}`,{
          is_active: true,
        })
        console.log(response.data);
      }
      catch (error) {
        console.error(error);
      }
    }
    updateConnectStatus();



  }, [currentMount, id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(values)


    for (let i = 0; i < 1000; i++) {
      
      const lat = values[i][2];
      const long = values[i][3];
      console.log(lat, long)
      if (lat === undefined || long === undefined) {
        continue;
      }

      const newLatitude = parseFloat(lat);
      const newLongitude = parseFloat(long);
      setLatitude(newLatitude);
      setLongitude(newLongitude);
      const clientId = localStorage.getItem('client');
      try{
       const  body={
          lat: newLatitude,
          lon: newLongitude,
          connection_type: "client",
          id: clientId,
        }
        setCurrentMount(currentMount);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        socket.send(JSON.stringify(body));

        socket.onmessage = function(event) {
          console.log(`[message] Data received from server: ${event.data}`);
          const parsedData = JSON.parse(event.data);
          // Extract values
          const rtkCorrections = parsedData['RTK Corrections'] || {};
          const server = rtkCorrections.server;
          const idValue = rtkCorrections.server;
          // Print the extracted values
          console.log('Server:', server);
          console.log('ID:', idValue);
          if (server && idValue) {
            if (idValue !== currentMount) {
              setCurrentMount(idValue);
              socket.close();
              console.log('socket closed');
            handleWebSocketConnect(idValue);
            }
            setCurrentMount(idValue);
            
          }
        };
      } catch (error) {
        console.error(error);
      }
    }
  };

 




  const handelSendRealTimedata = () => {
  const data  = {
    lat: 0,
    lon: 0,
    connection_type: "client",
    id: id,
  }
  socket.send(JSON.stringify(data));
  }


  
  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Choose Server</h1>
        {/* <Map lat={latitude} long={longitude} /> */}


        {
          available.map((server) => (
            <div key={server.id} 
            style={
              {
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
                width: "100%",
                cursor: "pointer",
              }
            }
            >
              <p>Server Id: {server.id}</p>
              <p>Server Latitude: {server.latitude}</p>
              <p>Server Longitude: {server.longitude}</p>
              <button 
              onClick={
                ()=>
                
                  ConnectToServer(server.id)
              }
              > 
              ConnectToServer
              </button>
            </div>
          ))
        }
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>


            <button
            onClick={()=>{
              handelInitialdata()
            }}
            >
              Autoconnect
            </button>

            <input type="file" onChange={handleFileUpload} />

          

            <form onSubmit={handleFormSubmit}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Latitude:
            <input
              type="text"
              name="lat"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              value={latitude}
              onChange={(event) => setLatitude(
                parseFloat(event.target.value)
                )}
            />
          </label>
          <label style={{ display: 'block', marginBottom: '20px' }}>
            Longitude:
            <input
              type="text"
              name="long"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              value={longitude}
              onChange={(event) => setLongitude(
                parseFloat( event.target.value)
                )
              }
            />
          </label>
          <button
            type="submit"
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>

          
        </form>
        <button
            onClick={()=>{
              handelDisconnect(id)
            }
             
            }
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Disconnect
          </button>
            <div 
            style ={{
              maxheight: "200px", 
              overflow: "scroll",
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
              width: "100%",
            }}
            >
  <h2>Messages</h2>
  <ul>
    {messages.map((msg, index) => (
      <li key={index}>{msg}</li>
    ))}
  </ul>
</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;




