import { useEffect, useState } from 'react';

import L, { LatLng } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

// import { FaThumbsUp, FaThumbsDown, FaRegMap } from 'react-icons/fa';
import { BsArrow90DegRight } from 'react-icons/bs';

import { IMarker } from '../../interfaces/IMarker';
import './LocationMarkers.css';
import 'leaflet/dist/leaflet.css';
import markerImg from '../../assets/marker.svg';

function LocationMarkers({
  selectMarker,
  setDestination,
  setLoading,
  isLoading,
}: {
  selectMarker: (marker: IMarker) => void;
  setDestination: (destination: string) => void;
  setLoading: (state: boolean) => void;
  isLoading: boolean;
}) {
  const [selectedMarker, setSelectedMarker] = useState<IMarker | undefined>(
    undefined,
  );
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [isError, setError] = useState<boolean>(false);

  const markerHtmlStyles = (color: string) => `
  background-color: ${color};
  width: 1rem;
  height: 1rem;
  left: -0.2rem;
  top: -0.2rem;
  position: relative;
  border-radius: 50%;
    `;

  const icon = (color: string) =>
    L.divIcon({
      html: `<div style="${markerHtmlStyles(color)}" />`,
    });

  const selectedMarkerHtmlStyles = `
  background-image: url(${markerImg});
  width: 2rem;
  height: 2rem;
  left: -0.45rem;
  top: -0.9rem;
  position: relative;
  border-radius: 50%;
  background-repeat: no-repeat;`;

  const selectedIcon = L.divIcon({
    html: `<div style="${selectedMarkerHtmlStyles}" />`,
  });

  useEffect(() => {
    if (markers.length === 0 && !isLoading && !isError) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/list-all-points`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.STATUS === 'SUCCESS') {
            setMarkers(res.DATA as IMarker[]);
          } else {
            setError(true);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
          console.error(err);
        });
    }
  }, [markers, isLoading, isError, setLoading]);

  return (
    <MarkerClusterGroup chunkedLoading>
      {markers.map((marker, i) => (
        <Marker
          key={i}
          position={new LatLng(marker.lat, marker.lon)}
          icon={
            marker.lat === selectedMarker?.lat &&
            marker.lon === selectedMarker.lon
              ? selectedIcon
              : icon(marker.color ?? '#FFFFFF')
          }
          eventHandlers={{
            click: (event) => {
              setSelectedMarker(marker);
              selectMarker(marker);
              event.target.closePopup();
            },
            // mouseover: (event) => {
            //   if (
            //     marker.lat !== selectedMarker?.lat ||
            //     marker.lon !== selectedMarker.lon
            //   ) {
            //     event.target.openPopup();
            //   }
            // },
          }}
        >
          <Popup>
            <div className="m-2 flex flex-col">
              <div className="justify-content flex min-w-[12rem] items-center gap-2">
                <div className="flex w-2/5 justify-end gap-1">
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-nilg-blue"
                    onClick={() =>
                      setDestination(`coords:${marker.lat},${marker.lon}`)
                    }
                  >
                    <BsArrow90DegRight className="text-sm font-semibold text-white" />
                  </button>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}

export default LocationMarkers;
