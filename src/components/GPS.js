import React, { useEffect, useRef } from "react";
import { json } from "react-router-dom";
let checkUp;
let checks;
let checkItems = [];
let map;

const GPS = () => {
  const mapRef = useRef(null);
  const radius = 30;

  const initMap = async (latitude, longitude) => {
    const { Map, Circle } = await window.google.maps.importLibrary("maps");
    const mapElement = mapRef.current;

    if (mapElement) {
      map = new Map(mapElement, {
        center: { lat: latitude, lng: longitude },
        zoom: 19,
      });
      console.log(map);
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
  };

  useEffect(() => {
    if (localStorage.getItem("checkItems")) {
      checkItems = JSON.parse(localStorage.getItem("checkItems"));
      checks = checkItems.length;
    } else {
      checks = 0;
    }
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      checkUp = {
        checkNumber: checks++,
        latitude: latitude,
        longitude: longitude,
      };
      checkItems.push(checkUp);
      localStorage.setItem("checkItems", JSON.stringify(checkItems));
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
    <div id="map" ref={mapRef} style={{ width: "100%", height: "600px" }}>
      <span className="d-flex justify-content-center fs-1 m-3 p-3 ">
        Loading...
      </span>
    </div>
  );
};

export default GPS;
