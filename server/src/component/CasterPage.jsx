import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CasterPage = () => {
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.7.120:8000/get-casters/');
        setResponseData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setResponseData(null);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (name) => {
    const sanitizedName = name.replace(/\s/g, '');
    navigate("/message", { state: { name: sanitizedName } });
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="max-w-screen-xl mx-auto mt-2 px-6">
        {loading ? (
          <p>Loading...</p>
        ) : responseData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Display your response data here */}
            {responseData.map((dataItem, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-200 to-blue-300 p-4 rounded-full shadow-md cursor-pointer transition duration-300 transform hover:scale-105"
                onClick={() => handleCardClick(dataItem.name)}
              >
                <p className="font-bold">{dataItem.name}</p>
                {/* Add other data fields here */}
              </div>
            ))}
          </div>
        ) : (
          <p>Error fetching data.</p>
        )}
      </div>
    </div>
  );
};

export default CasterPage;
