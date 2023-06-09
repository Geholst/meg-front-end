import React, { useEffect, useRef } from "react";

const GPS = () => {
  const mapRef = useRef(null);
  const radius = 30;

  const initMap = async (latitude, longitude) => {
    const { Map, Circle } = await window.google.maps.importLibrary("maps");
    const mapElement = mapRef.current;
    let map;

    if (mapElement) {
      map = new Map(mapElement, {
        center: { lat: latitude, lng: longitude },
        zoom: 19,
      });

      // Add a circle overlay to represent the radius
      const circle = new Circle({
        map,
        center: { lat: latitude, lng: longitude },
        radius: radius,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.35,
      });
    }
    console.log(map);
  };

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      console.log("User's location:", latitude, longitude);
      initMap(latitude, longitude);
    };

    const errorCallback = (error) => {
      console.log("Error retrieving user's location:", error);
    };

    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  return (
    <div id="map" ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
  );
};

export default GPS;
