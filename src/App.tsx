import { useState } from 'react';
import { IMarker } from './interfaces/IMarker';
import CookieBanner from './components/cookie-banner/CookieBanner';
import Header from './components/header/Header';
import Map from './components/map/Map';
import Sidebar from './components/sidebar/Sidebar';
import { IRoute } from './interfaces/IRoute';

function App() {
  const [isShowingSidebar, showSidebar] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<IRoute | null>(null);
  const [directionRoutes, setDirectionRoutes] = useState<IRoute[]>([]);

  function onCloseDetails() {
    showSidebar(false);
  }

  function onSelectMarker(marker: IMarker) {
    showSidebar(true);
    setSelectedMarker(marker);
  }

  function onSetOrigin(origin: string) {
    showSidebar(true);
    setSelectedMarker(null);
    setOrigin(origin);
  }

  function onSetDestination(destination: string) {
    showSidebar(true);
    setSelectedMarker(null);
    setDestination(destination);
  }

  function onSelectedRoute(route: IRoute | null) {
    setSelectedRoute(route);
  }

  function onSetDirectionRoutes(routes: IRoute[]) {
    setDirectionRoutes(routes);
  }

  return (
    <>
      <Header></Header>
      {isShowingSidebar ? (
        <div className="md:w-1/2 lg:w-1/3 absolute z-30 h-full w-full sm:w-full pt-16">
          <Sidebar
            selectedMarker={selectedMarker}
            closeDetails={onCloseDetails}
            origin={origin}
            destination={destination}
            selectRoute={onSelectedRoute}
            selectedRoute={selectedRoute}
            setDirectionRoutes={onSetDirectionRoutes}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="relative z-10">
        <Map
          selectMarker={onSelectMarker}
          setOrigin={onSetOrigin}
          setDestination={onSetDestination}
          routeClick={onSelectedRoute}
          selectedRoute={selectedRoute}
          directionRoutes={directionRoutes}
        ></Map>
      </div>
      <CookieBanner />
    </>
  );
}
export default App;
