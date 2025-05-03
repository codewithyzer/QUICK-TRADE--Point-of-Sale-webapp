// MapPicker.jsx
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

export function MapPicker({ onLocationSelect }) {
  const [position, setPosition] = useState([14.5995, 120.9842]); // Default to Manila

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        if (onLocationSelect) onLocationSelect({ lat, lng });
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
      <Marker position={position} />
    </MapContainer>
  );
}
