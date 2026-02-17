import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation } from 'lucide-react';
import { Cab, RouteData } from '../../types';
import { COLORS } from '../../constants';
// REMOVED: import 'leaflet/dist/leaflet.css'; - This causes a SyntaxError in ESM environments. CSS is loaded in index.html.

interface MapViewProps {
  cab: Cab;
  route: RouteData;
}

// Custom Icons
const createIcon = (color: string, heading: number = 0, type: 'cab' | 'user') => {
  const rotationStyle = type === 'cab' ? `transform: rotate(${heading}deg); transition: transform 0.5s linear;` : '';
  const iconHtml = type === 'cab' 
    ? `<div style="${rotationStyle} color: ${color}; background: #1e293b; padding: 4px; border-radius: 50%; border: 2px solid ${color}; box-shadow: 0 0 10px ${color};">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
       </div>`
    : `<div style="color: ${color}; position: relative;">
         <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: ${color}; opacity: 0.3; border-radius: 50%; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
         <svg width="32" height="32" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
       </div>`;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const RecenterMap: React.FC<{ center: L.LatLngExpression }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
};

export const MapView: React.FC<MapViewProps> = ({ cab, route }) => {
  const [mapReady, setMapReady] = useState(false);

  return (
    <div className="w-full h-full relative">
      <MapContainer 
        center={[cab.location.lat, cab.location.lng]} 
        zoom={15} 
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        whenReady={() => setMapReady(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="map-tiles"
        />

        {/* Route Path */}
        <Polyline 
          positions={route.path.map(p => [p.lat, p.lng])} 
          pathOptions={{ color: COLORS.teal, weight: 4, opacity: 0.7, dashArray: '10, 10' }} 
        />

        {/* Cab Marker */}
        <Marker 
          position={[cab.location.lat, cab.location.lng]} 
          icon={createIcon(COLORS.orange, cab.heading, 'cab')}
        >
           <Popup className="glass-popup">
             <div className="text-slate-900 font-bold">{cab.id}</div>
             <div className="text-slate-600 text-sm">Driver: {cab.driverName}</div>
           </Popup>
        </Marker>

        {/* Destination Marker */}
        <Marker 
          position={[route.path[route.path.length-1].lat, route.path[route.path.length-1].lng]} 
          icon={createIcon(COLORS.teal, 0, 'user')}
        />

        <RecenterMap center={[cab.location.lat, cab.location.lng]} />
      </MapContainer>

      {/* Decorative Overlays */}
      <div className="absolute bottom-8 right-8 z-[1000] flex flex-col gap-2">
         <button className="bg-slate-800/80 backdrop-blur text-white p-3 rounded-full hover:bg-cyan-600 transition shadow-lg border border-white/10">
           <Navigation size={24} />
         </button>
      </div>
    </div>
  );
};