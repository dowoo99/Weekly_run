import React from "react";
import { Map, Polyline } from "react-kakao-maps-sdk";

const KakaoMap = ({ path }) => {
  return (
    <>
      <Map
        style={{
          width: "100%",
          height: "36rem"
        }}
        center={path[path?.length - 1]}
        zoomable={false}
        draggable={false}
        level={3}
      >
        <Polyline path={path} strokeWeight={6} strokeColor={"#F03800"} strokeOpacity={0.9} strokeStyle={"solid"} />
      </Map>
    </>
  );
};

export default KakaoMap;
