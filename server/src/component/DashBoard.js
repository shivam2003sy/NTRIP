import React from "react";
import Map from "./Map";

const Dashboard = () => {
  const [latitude, setLatitude] = React.useState(78.568459);
  const [longitude, setLongitude] = React.useState(25.448425);

  const [socket, setSocket] = React.useState(null);
  const id = localStorage.getItem("server");

  // const [message, setMessage] = React.useState(
  //   {   "lat" : 37 ,   "lon" : 98,   "connection_type" : "client","id":1}
  // );
  // const handleSendMessage = () => {
  //   console.log("Sending message");
  //   console.log(message);
  //   console.log(socket);
  //   console.log(socket.readyState);
  //   console.log(WebSocket.OPEN);
  //   if (socket.readyState === WebSocket.OPEN) {
  //     for (var i = 0; i < 100000; i++) {
  //       console.log("Sending message");
  //       socket.send(message);
  //       console.log(socket.readyState);
  //     }
  //   }
  // };

  const [message, setMessage] = React.useState({
    lat: 37,
    lon: 98,
    connection_type: "client",
    id: id,
  });

  // const handleSendMessage = () => {
  //   console.log("Sending message");
  //   console.log(message);
  //   console.log(socket);
  //   console.log(socket.readyState);
  //   console.log(WebSocket.OPEN);

  //   if (socket.readyState === WebSocket.OPEN) {
  //     for (var i = 0; i < 100; i++) {
  //       console.log("Sending message");
  //       socket.send(JSON.stringify(message)); // Convert message to JSON string before sending
  //       console.log(socket.readyState);
  //     }
  //   }
  // };

  const handleSendMessage = () => {
    console.log("Sending messages");
    console.log(socket);
    console.log(socket.readyState);

    if (socket.readyState === WebSocket.OPEN) {
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          console.log("Sending message");
          socket.send(JSON.stringify(message));
          console.log(socket.readyState);
        }, 3000);
      }
    }
  };

  const handleWebSocketConnect = () => {
    const id = localStorage.getItem("server");
    // Create a new WebSocket instance
    const newSocket = new WebSocket(
      `ws://192.168.123.120:8000/ws/${id}/server/`
    );

    // WebSocket event listeners
    newSocket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
    });

    newSocket.addEventListener("message", (event) => {
      console.log("WebSocket message received:", event.data);
    });

    newSocket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });

    // Set the new socket in the component state
    setSocket(newSocket);
  };

  const handleWebSocketDisconnect = async() => {
    // Close the WebSocket connection
    if (socket) {
      socket.close();
      

      setSocket(null);
    }
    const body = {
        
      is_active: false,
    };
    const response = await fetch(
      `http://192.168.123.120:8000/update-server-coordinates/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }      );

      console.log(response);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { lat, long } = event.target.elements;
    setLatitude(parseFloat(lat.value));
    setLongitude(parseFloat(long.value));
    const id = localStorage.getItem("server");
    console.log(id);
    const body = {
      latitude: parseFloat(lat.value),
      longitude: parseFloat(long.value),
      is_active: true,
    };
    // update the cordinae in the database
    const response = await fetch(
      `http://192.168.123.120:8000/update-server-coordinates/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (data) {
      alert("Coordinates Updated");
    }

    console.log(data);
  };

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Left Section (Map) */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1
          style={{
            marginBottom: "20px",
            fontFamily: "sans-serif",
            fontSize: 25,
            fontWeight: 500,
            borderBottom: "2px solid gray",
            paddingBottom: 20,
            boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          Dashboard
        </h1>
        <Map lat={latitude} long={longitude} />
      </div>

      {/* Right Section (Form) */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f4f4f4" }}>
        <h2
          style={{
            marginBottom: "20px",
            fontFamily: "sans-serif",
            fontSize: 25,
            fontWeight: 500,
            borderBottom: "2px solid gray",
            paddingBottom: 20,
            boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          Update Server Coordinates
        </h2>
        <form onSubmit={handleFormSubmit}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Latitude:
            <input
              type="text"
              name="lat"
              style={{ width: "100%", padding: "8px", boxSizing: "border-box", textAlign: "center" }}
              value={latitude}
              onChange={(event) => setLatitude(parseFloat(event.target.value))}
            />
          </label>
          <label style={{ display: "block", marginBottom: "20px" }}>
            Longitude:
            <input
              type="text"
              name="long"
              style={{ width: "100%", padding: "8px", boxSizing: "border-box", textAlign: "center" }}
              value={longitude}
              onChange={(event) => setLongitude(parseFloat(event.target.value))}
            />
          </label>
          <button
            type="submit"
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleWebSocketConnect}
        >
          Connect to Caster
        </button>
        <button
          onClick={handleWebSocketDisconnect}
          style={{
            backgroundColor: "Red",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            margin : "10px"
          }}
        >
          Disconnect
        </button>
        <button
          onClick={handleSendMessage}
          style={{
            backgroundColor: "orange",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
