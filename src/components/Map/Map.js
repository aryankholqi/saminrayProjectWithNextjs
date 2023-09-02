import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import MarkerLogo from "src/components/Map/Marker.png";
import { Icon } from "leaflet";
import React, { useState } from "react";
import Styles from "styles/map.module.css";

export default function Map({ formik }) {
  function LocationMarker() {
    const [markerPosition, setMarkerPosition] = useState(null);

    const map = useMapEvent("click", (e) => {
      const { lat, lng } = e.latlng;
      console.log("Clicked at:", lat, lng);
      formik.values.lat = lat;
      formik.values.lang = lng;
      setMarkerPosition([lat, lng]);
    });

    return (
      <>
        {markerPosition && (
          <Marker
            position={markerPosition}
            icon={new Icon({ iconUrl: MarkerLogo })}
          />
        )}
      </>
    );
  }

  return (
    <MapContainer
      className={Styles.map}
      center={{ lat: 35.689198, lng: 51.388973 }}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
