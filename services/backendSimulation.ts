import { useState, useEffect, useRef } from 'react';
import { Cab, Coordinate, RouteData } from '../types';
import { MOCK_ROUTE_PATH, INITIAL_CAB_STATE } from '../constants';
import { getRouteInsight } from './geminiService';

// Helper to interpolate between two coordinates
const interpolate = (start: Coordinate, end: Coordinate, fraction: number): Coordinate => {
  return {
    lat: start.lat + (end.lat - start.lat) * fraction,
    lng: start.lng + (end.lng - start.lng) * fraction
  };
};

// Helper to calculate bearing
const getBearing = (start: Coordinate, end: Coordinate): number => {
  const startLat = start.lat * Math.PI / 180;
  const startLng = start.lng * Math.PI / 180;
  const endLat = end.lat * Math.PI / 180;
  const endLng = end.lng * Math.PI / 180;

  const y = Math.sin(endLng - startLng) * Math.cos(endLat);
  const x = Math.cos(startLat) * Math.sin(endLat) -
            Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
  const brng = Math.atan2(y, x);
  return (brng * 180 / Math.PI + 360) % 360;
};

export const useCabSimulation = (isActive: boolean) => {
  const [cab, setCab] = useState<Cab>(INITIAL_CAB_STATE);
  const [route, setRoute] = useState<RouteData>({
    path: MOCK_ROUTE_PATH,
    etaSeconds: 300,
    distanceKm: 2.5,
    trafficCondition: 'moderate',
    nextStop: 'HGS Main Campus'
  });
  const [aiMessage, setAiMessage] = useState<string>("Initializing route analytics...");

  const progressRef = useRef(0);
  const segmentRef = useRef(0);
  const lastUpdateRef = useRef(Date.now());
  const speedRef = useRef(0.0005); // Speed of simulation

  // Mock AI Insight updates
  useEffect(() => {
    if (!isActive) return;

    // Initial check
    getRouteInsight("Downtown", "HGS Campus", "Moderate Traffic")
      .then(setAiMessage);

    const interval = setInterval(() => {
       // Randomly update traffic scenario
       const conditions = ['Heavy', 'Clear', 'Moderate'];
       const condition = conditions[Math.floor(Math.random() * conditions.length)];
       
       getRouteInsight("Interstate 80", "HGS Campus", condition)
        .then(setAiMessage);
    }, 15000); // New insight every 15s

    return () => clearInterval(interval);
  }, [isActive]);

  // Animation Loop
  useEffect(() => {
    if (!isActive) return;

    let animationFrameId: number;

    const animate = () => {
      const now = Date.now();
      const delta = now - lastUpdateRef.current;
      lastUpdateRef.current = now;

      // Update progress
      progressRef.current += speedRef.current * (delta / 16);

      if (progressRef.current >= 1) {
        progressRef.current = 0;
        segmentRef.current += 1;

        // Loop the route
        if (segmentRef.current >= MOCK_ROUTE_PATH.length - 1) {
            segmentRef.current = 0;
        }
      }

      const startNode = MOCK_ROUTE_PATH[segmentRef.current];
      const endNode = MOCK_ROUTE_PATH[segmentRef.current + 1];

      if (startNode && endNode) {
        const newLocation = interpolate(startNode, endNode, progressRef.current);
        const heading = getBearing(startNode, endNode);
        
        // Update Cab State
        setCab(prev => ({
          ...prev,
          location: newLocation,
          heading
        }));

        // Update ETA based on distance remaining (rough calc)
        const totalSegments = MOCK_ROUTE_PATH.length - 1;
        const segmentsLeft = totalSegments - segmentRef.current - progressRef.current;
        const eta = Math.ceil(segmentsLeft * 60); // Assume 1 min per segment roughly
        
        setRoute(prev => ({
            ...prev,
            etaSeconds: eta
        }));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  return { cab, route, aiMessage };
};