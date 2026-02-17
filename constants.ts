import { Coordinate } from './types';

export const COLORS = {
  slate: '#2C3E50',
  teal: '#00BCD4',
  orange: '#FF9800',
  white: '#FFFFFF',
  glassBg: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

// Simulated route: A path through a city grid (San Francisco styled for demo)
export const MOCK_ROUTE_PATH: Coordinate[] = [
  { lat: 37.7749, lng: -122.4194 }, // Start
  { lat: 37.7752, lng: -122.4200 },
  { lat: 37.7760, lng: -122.4215 },
  { lat: 37.7775, lng: -122.4230 },
  { lat: 37.7790, lng: -122.4250 }, // Turn
  { lat: 37.7810, lng: -122.4245 },
  { lat: 37.7830, lng: -122.4240 },
  { lat: 37.7850, lng: -122.4235 }, // Office
];

export const OFFICE_LOCATION: Coordinate = MOCK_ROUTE_PATH[MOCK_ROUTE_PATH.length - 1];

export const INITIAL_CAB_STATE = {
  id: 'PG-8821',
  driverName: 'Alex R.',
  licensePlate: 'HGS-221',
  location: MOCK_ROUTE_PATH[0],
  heading: 0,
  status: 'arriving' as const,
  passengerCount: 2,
  capacity: 4,
};