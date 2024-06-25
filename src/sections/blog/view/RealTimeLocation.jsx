import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const taxiIcon = {
  red: L.icon({
    iconUrl: '/assets/images/avatars/avatar_1.jpg',
    iconSize: [30, 30]
  }),
  yellow: L.icon({
    iconUrl: '/assets/images/avatars/avatar_2.jpg',
    iconSize: [30, 30]
  }),
  green: L.icon({
    iconUrl: '/assets/images/avatars/avatar_1.jpg',
    iconSize: [30, 30]
  })
};

const RoutingControl = ({ from, icon, marker, setMarker, onArrival, currentMarkerIndex, index }) => {
  const map = useMapEvent('click', (e) => {
    if (currentMarkerIndex === index && !marker.moved) {
      L.Routing.control({
        waypoints: [
          L.latLng(marker.latlng.lat, marker.latlng.lng),
          L.latLng(e.latlng.lat, e.latlng.lng)
        ],
        createMarker: () => null
      }).on('routesfound', function (event) {
        const routes = event.routes;
        routes[0].coordinates.forEach((coord, coordIndex) => {
          setTimeout(() => {
            marker.ref.current.setLatLng([coord.lat, coord.lng]);
            if (coordIndex === routes[0].coordinates.length - 1) {
              setMarker(prevMarker => ({ ...prevMarker, moved: true, latlng: { lat: coord.lat, lng: coord.lng } }));
              onArrival(marker);
            }
          }, 500 * coordIndex); // Slower movement with 500ms interval
        });
      }).addTo(map);
    }
  });

  useEffect(() => {
    if (marker.ref && !marker.ref.current) {
      marker.ref.current = L.marker([from.lat, from.lng], { icon }).addTo(map);
    }
  }, [map, icon, marker]);

  return null;
};

const RealTimeLocation = () => {
  const from = { lat: 31.7917, lng: -7.0926 }; // Coordinates for Morocco
  const [markers, setMarkers] = useState([
    { latlng: from, moved: false, ref: useRef() },
    { latlng: from, moved: false, ref: useRef() },
    { latlng: from, moved: false, ref: useRef() }
  ]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);

  const handleMarkerMove = (index, newMarker) => {
    setMarkers(prevMarkers => {
      const newMarkers = [...prevMarkers];
      newMarkers[index] = newMarker;
      return newMarkers;
    });
  };

  const handleArrival = (marker) => {
    alert('Marker has arrived at the destination');
    L.Routing.control({
      waypoints: [
        L.latLng(marker.latlng.lat, marker.latlng.lng),
        L.latLng(from.lat, from.lng)
      ],
      createMarker: () => null
    }).on('routesfound', function (event) {
      const routes = event.routes;
      routes[0].coordinates.forEach((coord, index) => {
        setTimeout(() => {
          marker.ref.current.setLatLng([coord.lat, coord.lng]);
          if (index === routes[0].coordinates.length - 1) {
            setMarkers(prevMarkers => {
              const newMarkers = [...prevMarkers];
              const markerIndex = newMarkers.findIndex(m => m.ref === marker.ref);
              if (markerIndex !== -1) {
                newMarkers[markerIndex] = { ...marker, moved: false, latlng: from };
              }
              return newMarkers;
            });
            setCurrentMarkerIndex(prevIndex => (prevIndex < markers.length - 1 ? prevIndex + 1 : prevIndex));
          }
        }, 500 * index); // Slower movement with 500ms interval
      });
    }).addTo(map);
  };

  return (
    <MapContainer center={[31.7917, -7.0926]} zoom={6} style={{ width: '100%', height: '100vh' }}>
      <TileLayer
        attribution='Leaflet &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      {markers.map((marker, index) => (
        <RoutingControl
          key={index}
          from={from}
          icon={[taxiIcon.red, taxiIcon.yellow, taxiIcon.green][index]}
          marker={marker}
          setMarker={(newMarker) => handleMarkerMove(index, newMarker)}
          onArrival={handleArrival}
          currentMarkerIndex={currentMarkerIndex}
          index={index}
        />
      ))}
    </MapContainer>
  );
};

export default RealTimeLocation;
