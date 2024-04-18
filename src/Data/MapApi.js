import React, { useState, useEffect } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import UseKakaoLoader from "./useKakaoLoader";
import styled from "styled-components";

export default function BasicMap() {
  UseKakaoLoader();

  const { kakao } = window;
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  // 입력 폼 변화 감지하여 입력 값 관리
  const [Value, setValue] = useState("");

  // 검색 기능
  const keywordChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const submitKeyword = (e) => {
    e.preventDefault();
  };

  const valueChecker = () => {
    if (Value === "") {
      alert("검색어를 입력해주세요.");
    } else {
      if (!map) return;
      const places = new kakao.maps.services.Places();
      const pageBtn = document.querySelector(".pageBtn");

      places.keywordSearch(Value,(data, status, pagination) => {
          const resultEl = document.querySelector(".searchResult");
          var nextBtnClick = document.getElementById("nextBtn");
          resultEl.innerHTML = "";
          pageBtn.style.display = "block";

          console.log(`status >>> `, status);
          console.log(`data >>> `, data);

          if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();
            let markers = []; // 검색 시 마커 보이기

            data.forEach((item) => {
              const marker = createMarker(item);
              markers.push(marker);
              bounds.extend(new kakao.maps.LatLng(item.y, item.x));

              appendResultListItem(resultEl, item, marker);
            });

            setMarkers(markers);
            map.setBounds(bounds);

            if (pagination.hasNextPage) {
              nextBtnClick.addEventListener("click", function () {
                console.log(`clickkkkk >>>`);
                pagination.nextPage();
              });
            }

          } else if(status === kakao.maps.services.Status.ZERO_RESULT) {
            pageBtn.style.display = "none";
            alert('검색 결과가 존재하지 않습니다.');
            return;

          } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
          }

          function createMarker(item) {
            return {
              position: {
                lat: item.y,
                lng: item.x,
              },
              content: item.place_name,
              place_url: item.place_url,
            };
          }

          function appendResultListItem(parent, item, marker) {
            const resultList = document.createElement("li");
            resultList.className = "restaurant";

            resultList.addEventListener("click", () => handleClick(marker));

            const restaurantType = item.category_name
              ? item.category_name.split(">")[1]
              : "";
            const restaurantTel = item.phone !== 0 ? item.phone : "정보 없음";

            resultList.innerHTML = `
            <div class="placeAndtype" style="display: flex;">
              <p class="placeName">${item.place_name}</p>&nbsp;
              <p>${restaurantType}</p>
            </div>
            <p>주소: ${item.address_name}</p>
            <p>도로명: ${item.road_address_name}</p>
            <p>Tel: ${restaurantTel}</p>
            <hr>
          `;

            parent.appendChild(resultList);
          }

          function handleClick(marker) {
            setInfo(marker);
          }
        },
        { page: 1 }
      );
    }
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
        <SearchForm method="post" onSubmit={submitKeyword}>
          <input
            className="search-entry"
            onChange={keywordChange}
            placeholder="검색어를 입력해 주세요."
            type="text"
          ></input>
          <div>
            <button className="btn" onClick={valueChecker}>
              Search
            </button>
          </div>
        </SearchForm>
        <SearchResult className="searchResult"></SearchResult>
        <PageButton className="pageBtn">
          <button id="prevBtn">prev</button>
          <button id="nextBtn">next</button>
        </PageButton>
      </Fixation>
      <div className="myMap">
        <Map
          center={state.center}
          style={{ width: "758px", height: "650px", borderRadius: "10px" }}
          level={3}
          onCreate={setMap}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <div style={{ color: "#000", textAlign: "center" }}>
                  <a
                    target="blank"
                    href={`${marker.place_url}`}
                    style={{ textDecoration: "none" }}
                  >
                    {marker.content}
                  </a>
                </div>
              )}
            </MapMarker>
          ))}
          {!state.isLoading && <MapMarker position={state.center}></MapMarker>}
          <ZoomControl />
        </Map>
      </div>
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
  padding: 20px;
`;

const PageButton = styled.div`
  margin-top: 10px;
  width: 465px;
  text-align: center;
  display: none;

  button + button {
    margin-left: 10px;
  }
`;
