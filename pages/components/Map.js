import React from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoidWx1YmdrM2syNzAiLCJhIjoiY2t5d2xkNDNzMDlnYjJvbXhnODYyY3FmZyJ9.YHE5j4Z7Z9QCfCSukMujng";

export default function Map({ pickup, dropoff }) {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      // style: "mapbox://styles/mapbox/satellite-v9",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [69.240562, 41.311081],
      zoom: 6,
    });

    if(pickup){
      addToMap(map,);
    }

    if(pickup, dropoff){
      map.fitBounds([
        dropoff || ["", ""],
        pickup || ["", ""]
      ],{
        padding: 60
      })
    }

     // eslint-disable-next-line
  }, [pickup, dropoff]);

  const addToMap = (map) => {
    const marker1 = new mapboxgl.Marker()
      .setLngLat(pickup || ["", ""])
      .addTo(map);
    const marker2 = new mapboxgl.Marker()
      .setLngLat(dropoff || ["", ""])
      .addTo(map);
  };

 

  

  return <Wrapper id="map"></Wrapper>;
}

const Wrapper = tw.div`
  flex flex-col h-screen flex-1
`;
