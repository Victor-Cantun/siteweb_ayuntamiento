import React from "react";
import { createRoot } from "react-dom/client";
import { APIProvider, Map, AdvancedMarker, Pin, type MapCameraChangedEvent } from "@vis.gl/react-google-maps";

type Poi = { key: string; location: google.maps.LatLngLiteral };
const locations: Poi[] = [{ key: "operaHouse", location: { lat: 18.604556255218966, lng: -90.73189981596325 } }];

const PoiMarkers = (props: { pois: Poi[] }) => {
  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker key={poi.key} position={poi.location}>
          <Pin background={"#EA4335"} glyphColor={"#000"} borderColor={"#000"} />
        </AdvancedMarker>
      ))}
    </>
  );
};
const MyMapComponent = () => (
  <APIProvider apiKey={"AIzaSyB3OjoQWgPW3DZKNoQqqSnKc4xWKyRmFlg"} onLoad={() => console.log("Maps API has loaded.")}>
    <Map
      mapId="web-page-cantun"
      defaultZoom={18}
      defaultCenter={{ lat: 18.604556255218966, lng: -90.73189981596325 }}
      onCameraChanged={(ev: MapCameraChangedEvent) => console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)}
    >
      <PoiMarkers pois={locations} />
    </Map>
  </APIProvider>
);

/* const root = createRoot(document.getElementById("app"));
root.render(<MyMapComponent />); */

export default MyMapComponent;
