export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Cab {
  id: string;
  driverName: string;
  licensePlate: string;
  location: Coordinate;
  heading: number; // 0-360 degrees
  status: 'available' | 'busy' | 'arriving';
  passengerCount: number;
  capacity: number;
}

export interface RouteData {
  path: Coordinate[];
  etaSeconds: number;
  distanceKm: number;
  trafficCondition: 'clear' | 'moderate' | 'heavy';
  nextStop: string;
}

export enum AppView {
  LANDING = 'LANDING',
  MAP = 'MAP'
}

export interface SimulationState {
  activeCab: Cab;
  route: RouteData;
  progress: number; // 0 to 1 along the route
}