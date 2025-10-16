declare module "leaflet" {
  type LatLngTuple = [number, number];

  export type LatLngExpression = LatLngTuple | { lat: number; lng: number } | LatLngTuple[];
  export type LatLngBoundsExpression = [LatLngExpression, LatLngExpression] | LatLngExpression[];

  export interface MapOptions {
    center?: LatLngExpression;
    zoom?: number;
    [key: string]: unknown;
  }

  export interface FitBoundsOptions {
    paddingTopLeft?: [number, number];
    paddingBottomRight?: [number, number];
    maxZoom?: number;
    [key: string]: unknown;
  }

  export interface TileLayerOptions {
    attribution?: string;
    [key: string]: unknown;
  }

  export interface PathOptions {
    color?: string;
    weight?: number;
    opacity?: number;
    fillOpacity?: number;
    [key: string]: unknown;
  }

  export class Map {}
  export class TileLayer {}
  export class Polyline {}
  export class CircleMarker<T = any> {}
  export class Tooltip {}
}
