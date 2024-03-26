import React from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import UseKakaoLoader from "./useKakaoLoader";

export default function BasicMap() {
  UseKakaoLoader();

  return (
    <Map
      center={{ lat: 37.5724321, lng: 126.976902 }}
      style={{ width: "650px", height: "650px", borderRadius: "10px" }}
      level={3}
    >
      <MapMarker position={{ lat: 37.5724321, lng: 126.976902 }}> </MapMarker>
      <ZoomControl/>
    </Map>
  );
}
