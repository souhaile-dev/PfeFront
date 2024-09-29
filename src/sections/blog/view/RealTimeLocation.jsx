import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { VehicleSelector, DestinationSelector } from './VehicleAndDestinationSelector'; // Import the selection components

const taxiIcon = L.icon({
  iconUrl: '/assets/images/avatars/avatar_1.jpg',
  iconSize: [30, 30]
});

const RoutingControl = ({ from, to, icon, marker, setMarker, onArrival, vehicleMatricule, activeVehicle }) => {
  const map = useMapEvent('click', () => {});

  useEffect(() => {
    if (marker.ref && !marker.ref.current) {
      marker.ref.current = L.marker([from.lat, from.lng], { icon }).addTo(map);
    }
  }, [map, icon, marker, from]);

  useEffect(() => {
    if (to && vehicleMatricule === activeVehicle && !marker.moved) {
      L.Routing.control({
        waypoints: [
          L.latLng(marker.latlng.lat, marker.latlng.lng),
          L.latLng(to.lat, to.lng)
        ],
        createMarker: () => null
      }).on('routesfound', function (event) {
        const routes = event.routes;
        routes[0].coordinates.forEach((coord, coordIndex) => {
          setTimeout(() => {
            marker.ref.current.setLatLng([coord.lat, coord.lng]);
            if (coordIndex === routes[0].coordinates.length - 1) {
              setMarker(prevMarker => ({ ...prevMarker, moved: true, latlng: { lat: coord.lat, lng: coord.lng } }));
              onArrival(vehicleMatricule);
            }
          }, 500 * coordIndex); // Slower movement with 500ms interval
        });
      }).addTo(map);
    }
  }, [map, marker, setMarker, onArrival, to, vehicleMatricule, activeVehicle]);

  return null;
};

const RealTimeLocation = () => {
  const from = { lat: 31.7917, lng: -7.0926 }; // Coordinates for Morocco
  const destinations = [
    { name: 'Rabat', lat: 34.020882, lng: -6.84165 },
    { name: 'Casablanca', lat: 33.5731, lng: -7.5898 },
    { name: 'Marrakech', lat: 31.6295, lng: -7.9811 },
    { name: 'Agadir', lat: 30.4278, lng: -9.5981 },
    { name: 'Fes', lat: 34.0331, lng: -4.9998 },
    { name: 'Tangier', lat: 35.7595, lng: -5.8339 },
    { name: 'Oujda', lat: 34.6800, lng: -1.9076 },
    { name: 'Nador', lat: 35.1687, lng: -2.9335 }
  ];
  const vehicles = [
    { matricule: 'X12345', latlng: from },
    { matricule: 'Y67890', latlng: from },
    { matricule: 'Z11223', latlng: from },
    { matricule: 'A33445', latlng: from },
    { matricule: 'B55667', latlng: from },
    { matricule: 'C77889', latlng: from },
    { matricule: 'D99000', latlng: from },
    { matricule: 'E11222', latlng: from }
  ];
  const [markers, setMarkers] = useState(vehicles.map(vehicle => ({ latlng: vehicle.latlng, moved: false, ref: useRef() })));
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState({});
  const [activeVehicle, setActiveVehicle] = useState('');

  const handleMarkerMove = (index, newMarker) => {
    setMarkers(prevMarkers => {
      const newMarkers = [...prevMarkers];
      newMarkers[index] = newMarker;
      return newMarkers;
    });
  };

  const handleArrival = (vehicleMatricule) => {
    alert(`Vehicle ${vehicleMatricule} has arrived at the destination.`);
    setActiveVehicle(''); // Reset active vehicle after arrival
  };

  const handleDestinationSelect = (cityName) => {
    if (selectedVehicle) {
      const destination = destinations.find(city => city.name === cityName);
      setSelectedDestinations(prevDestinations => ({
        ...prevDestinations,
        [selectedVehicle]: destination
      }));
      setActiveVehicle(selectedVehicle); // Set the vehicle as active for movement
      setSelectedVehicle(''); // Reset selected vehicle
    } else {
      alert('Please select a vehicle first.');
    }
  };

  return (
    <>
      <VehicleSelector
        vehicles={vehicles}
        selectedVehicle={selectedVehicle}
        onVehicleSelect={setSelectedVehicle}
      />
      <DestinationSelector
        destinations={destinations}
        onConfirm={handleDestinationSelect}
      />
      <MapContainer center={[31.7917, -7.0926]} zoom={6} style={{ width: '100%', height: '100vh' }}>
        <TileLayer
          attribution='Leaflet &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {markers.map((marker, index) => {
          const vehicle = vehicles[index];
          const destination = selectedDestinations[vehicle.matricule];
          return (
            <RoutingControl
              key={vehicle.matricule}
              from={from}
              to={destination}
              icon={taxiIcon}
              marker={marker}
              setMarker={(newMarker) => handleMarkerMove(index, newMarker)}
              onArrival={handleArrival}
              vehicleMatricule={vehicle.matricule}
              activeVehicle={activeVehicle}
            />
          );
        })}
      </MapContainer>
    </>
  );
};

export default RealTimeLocation;
