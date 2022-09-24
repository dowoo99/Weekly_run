import React, { useState, useEffect } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { runData } from "../../../Recoil/Atoms/RunData";
import useInterval from "../../../Hooks/useInterval";
import Marker from "../../../Icons/Map_Marker.svg";
import Loading from "../../Common/Loading/Loading";
import { useMutation } from "react-query";
import { instance } from "../../../Utils/Instance";
import { useNavigate } from "react-router-dom";

const RunningMap = ({ stopInterval, endRun }) => {
  const [distance, setDistance] = useState(0);
  const [path, setPath] = useRecoilState(runData);
  const runLog = useRecoilValue(runData);

  const navigate = useNavigate();

  const [state, setState] = useState({
    center: {
      lat: "",
      lng: ""
    },
    errMsg: null,
    isLoading: false
  });

  const getDistance = async location => {
    try {
      const res = await instance.post("/api/user/location", location);

      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getDistanceQuery = useMutation(location => getDistance(location), {
    onSuccess: data => {
      if (data >= 0) {
        setDistance(prev => prev + 600);
      }
    }
  });

  //사용자 첫 위 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isLoading: true
          });
        },
        error => {
          console.error(error);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
      getDistanceQuery.mutate(state.center);
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false
      }));
    }
  }, []);

  // 위치 정보 가져오기 및 실시간 이동거리 계산 인터벌
  useInterval(
    () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setState(prev => ({
              ...prev,
              center: {
                lat: position.coords.latitude, // 위도
                lng: position.coords.longitude // 경도
              }
            }));
            getDistanceQuery.mutate(state.center);
            setPath(prev => ({
              ...prev,
              path: prev.path.concat(state.center),
              distance
            }));
          },
          error => {},
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false
        }));
      }
    },
    stopInterval ? null : 5000
  );

  //기록하기
  useEffect(() => {
    if (endRun) {
      setPath(prev => ({
        ...prev,
        distance: Number((distance / 1000).toFixed(1)),
        isFinish: true
      }));
    }
  }, [endRun]);

  //로딩 화면
  if (!state.isLoading) {
    return (
      <Loading>
        <div>지도 정보를 가져오고 있어요</div>
      </Loading>
    );
  }

  if (state.errMsg) {
    navigate("/error");
  }

  return (
    <Body>
      <Map
        center={state.center}
        style={{
          width: "inherit",
          height: "100vh"
        }}
        level={2}
        zoomable={true}
        draggable={true}
      >
        <Polyline
          path={runLog.path}
          strokeWeight={10}
          strokeColor={"#F03800"}
          strokeOpacity={0.9}
          strokeStyle={"solid"}
        />
        <MapMarker position={state.center} image={{ src: Marker, size: { width: 36, height: 36 } }} />
      </Map>
    </Body>
  );
};

export default RunningMap;

const Body = styled.div`
  @media only screen and (min-width: 880px) {
    max-width: 40rem;
  }
`;
