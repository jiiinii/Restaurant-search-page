import React, { useState, useEffect } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import UseKakaoLoader from "./UseKakaoLoader";
import styled from "styled-components";

function KakaoMapEvent({name}) {
  console.log(`name >>> `, name);
  UseKakaoLoader();

  const { kakao } = window; // window 객체로부터 스크립트에서 로드한 kakao api를 가져옴
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  // 입력 폼 변화 감지하여 입력 값 관리
  const [Value, setValue] = useState("");
  // // url에 검색 키워드 추가옵션.
  const navigate = useNavigate();

  // 검색 기능
  const keywordChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  // 검색어 제출 기능
  const submitKeyword = (e) => {
    e.preventDefault();
  };
  // 검색 버튼
  const valueChecker = () => {
    if (Value === "") {
      alert("검색어를 입력해주세요.");
    } else {
      if (!map) return;

      // 장소 검색 및 주소-좌표 간 변환 서비스
      const places = new kakao.maps.services.Places();
      const pageBox = document.querySelector(".pageBox");
      places.keywordSearch(Value, (data, status, pagination) => {
          console.log(`value >>> `, Value);
          console.log(`data >>> `, data);

          const resultEl = document.querySelector(".searchResult");
          resultEl.innerHTML = "";
          pageBox.style.display = "block";

          // 지도 API의 마커객체와 그리기 요소를 쉽게 지도 위에 그릴 수 있도록 기능을 제공
          if (status === kakao.maps.services.Status.OK) {
            // WGS84 좌표계에서 사각영역 정보를 표현하는 객체를 생성
            const bounds = new kakao.maps.LatLngBounds();
            // 검색 시 마커 보이기
            let localPin = [];

            data.forEach((item) => {
              const marker = createMarker(item);
              localPin.push(marker);
              bounds.extend(new kakao.maps.LatLng(item.y, item.x)); // WGS84 좌표 정보를 가지고 있는 객체를 생성한다.

              appendResultListItem(resultEl, item, marker);
            });

            setMarkers(localPin); // 마커 설정
            map.setBounds(bounds);

            // 페이지네이션 버튼
            const paginationButton = (tmp) => {
              pageBox.innerHTML = "";
              tmp.forEach(function (index) {
                const parent = document.createElement("li");
                const child = document.createElement("a");
                parent.className = `${index}Btn`;
                pageBox.append(parent);
                parent.append(child);
                child.append(`${index}`);
                const idxBtn = pageBox.querySelector(`.${index}Btn`);
                idxBtn.addEventListener("click", function () {
                  if ("next" === index) {
                    pagination.nextPage();
                  } else if ("prev" === index) {
                    pagination.prevPage();
                  }
                });
              });
            };

            if (pagination.hasNextPage && pagination.hasPrevPage) {
              paginationButton(["prev", "next"]);
            } else if (pagination.hasNextPage) {
              paginationButton(["next"]);
            } else if (pagination.hasPrevPage) {
              paginationButton(["prev"]);
            }

            // 검색어에 대한 정보가 존재하지 않을시
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            pageBox.style.display = "none";
            alert("검색 결과가 존재하지 않습니다.");
            return;
          } else if (status === kakao.maps.services.Status.ERROR) {
            pageBox.style.display = "none";
            alert("검색 결과 중 오류가 발생했습니다.");
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

            resultList.addEventListener("click", () => {
              handleClick(marker, item);
            });

            const restaurantType = item.category_name
              ? item.category_name.split(">")[1]
              : "";
            const restaurantTel = item.phone !== "" ? item.phone : "정보 없음";

            resultList.innerHTML = `
            <div class="placeAndtype" style="display: flex;">
              <p class="placeName">${item.place_name}</p>&nbsp;
              <p class="categoryName">${restaurantType}</p>
            </div>
            <p>주소: ${item.address_name}</p>
            <p>도로명: ${item.road_address_name}</p>
            <p>Tel: ${restaurantTel}</p>
            <hr>
          `;

            parent.appendChild(resultList);
          }

          function handleClick(marker, item) {
            setInfo(marker);
            fetch(`http://localhost:5000/api/items`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: item.place_name,
                time: new Date().getTime(),
              }),
            }).then((marker) => marker.json());
          }
          navigate(`/search/${Value}`);
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
        <PageBox className="pageBox"></PageBox>
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

KakaoMapEvent.propTypes = {
  name: PropTypes.node.isRequired,
};

export default KakaoMapEvent;

const Fixation = styled.div`
  display: block;
  margin-right: 80px;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
  align-items: baseline;

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
    border-radåius: 8px;
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

const PageBox = styled.div`
  display: inline-flex;
  padding-top: 10px;
  .nextBtn {
    transform: translate(250px);
  }
  .prevBtn {
    transform: translate(190px);
  }
  li {
    position: absolute;
    cursor: pointer;
    padding: 4px 10px;
    text-decoration: none;
    background-color: #efe4a2;
    color: black;
    border: 2px solid #222;
  }
`;
