
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpdmFtMjAwM3N5IiwiYSI6ImNscWJ1ODQ4NTA0Y20ya283M3lhYmdlN2sifQ.mXHlb2IgTueq2VZcj7jEjA';

const Map = ({ lat, long }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lat , long], // Note: The order of long and lat in center array
      zoom: 4,
    });

    // Add navigation controls to the map
    map.addControl(new mapboxgl.NavigationControl());

    // Add a marker at a specific location
    new mapboxgl.Marker().setLngLat([lat, long]).addTo(map);
  }, [lat, long]); // Include lat and long in the dependency array

  return <div id="map" style={{ width: '100%', height: '600px' }} />;
};

export default Map;
