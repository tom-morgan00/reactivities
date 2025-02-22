import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  coordinates: [number, number];
  venue: string;
};

export default function MapComponent({ coordinates, venue }: Props) {
  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates}>
        <Popup>{venue}</Popup>
      </Marker>
    </MapContainer>
  );
}
