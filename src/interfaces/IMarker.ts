export interface IMarker {
  lat: number;
  lon: number;
  likes?: number;
  dislikes?: number;
  address?: string;
  directionsUrl?: string;
  features?: {
    label: string;
    prob: number;
    icon: string;
    color: string;
  }[];
  color?: string;
}
