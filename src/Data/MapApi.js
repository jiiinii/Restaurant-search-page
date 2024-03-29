import React, { useState, useEffect } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import UseKakaoLoader from "./useKakaoLoader";
import styled from "styled-components";

export default function BasicMap() {
  UseKakaoLoader();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`123`);
  };

  // 현재 위치 추적
  const [state, setState] = useState({
    center: {
      // Default : 카카오 본사
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옴
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없습니다",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <>
      <Fixation>
        <SearchForm method="post" onSubmit={submitHandler}>
          <input
            className="search-entry"
            placeholder="검색어를 입력해 주세요."
            type="text"
          ></input>
          <div>
            <button className="btn">Search</button>
          </div>
        </SearchForm>
        <SearchResult></SearchResult>
      </Fixation>
      <Map
        center={state.center}
        style={{ width: "758px", height: "650px", borderRadius: "10px" }}
        level={3}
      >
        {!state.isLoading && <MapMarker position={state.center}></MapMarker>}
        <ZoomControl />
      </Map>
    </>
  );
}

const Fixation = styled.div`
  display: block;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
  align-items: baseline;
  margin-right: 80px;

  .search-entry {
    background-color: #f5f5f5;
    padding: 0px 20px 0px 20px;
    width: 350px;
    height: 50px;
    position: relative;
    border: 2px solid #545454;
    border-radius: 10px;
    font-size: 15px;
  }

  .btn {
    vertical-align: baseline;
    height: 50px;
    padding: 0 25px;
    max-width: 100%;
    line-height: 24px;
    display: inline-block;
    background-color: #efe4a2;
    border-radius: 8px;
    border: 2px solid #545454;
    box-sizing: border-box;

    &:hover {
      cursor: pointer;
      background-color: #f7f7f7;
    }
  }
`;

const SearchResult = styled.div`
  width: 465px;
  height: 580px;
  background-color: #f5f5f5;
  border: 2px solid #545454;
  border-radius: 8px;
  overflow: auto;
`;
