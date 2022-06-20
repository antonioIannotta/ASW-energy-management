import '../scss/map-style.scss'
import React from 'react'
import { Loader } from "@googlemaps/js-api-loader"

/*

const LocationPin = ({ text }) => (
  <div className="pin">
    <RoomIcon className="pin-icon" />    
    <p className="pin-text">{text}</p>
  </div>
)

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}

const Map = ({ location, zoomLevel }) => (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDUXP_QrMa8Q_ONTGyXSMH9AQRyKNzjuaE" }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={37.42216}
          lng={-122.08427}
          text={'1600 Amphitheatre Parkway, Mountain View, california.'}
        />
      </GoogleMapReact>
    </div>
  </div>
);

export default Map*/
/*
export default function InitMap() {

  const loader = new Loader({
    apiKey: "AIzaSyDUXP_QrMa8Q_ONTGyXSMH9AQRyKNzjuaE",
    version: "weekly",
    
  });

loader.load().then((google) => {
  new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}).catch(e => {
  console.log("error in google maps")
});

return (<div id="map">
  <h1>Ciao</h1>
</div>);

}*/