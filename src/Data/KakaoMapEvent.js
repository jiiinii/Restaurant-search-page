import React, { useState, useEffect } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CreateMarker from "../Components/CreateMarker";
import PaginationButton from "../Components/PaginationButton";
import UseKakaoLoader from "./UseKakaoLoader";
import styled from "styled-components";

function KakaoMapEvent({ name }) {
  UseKakaoLoader();
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  // url에 검색 키워드 추가옵션.
  const navigate = useNavigate();

  // 검색어 제출 기능
  const submitKeyword = (e) => {
    e.preventDefault();
  };
  // 검색 버튼
  const valueChecker = () => {
    const value = document.querySelector(".search-entry").value;
    if (value === "") {
      alert("검색어를 입력해주세요.");
    } else {
      navigate(`/search/${value}`); // url 변경
    }
  };

  useEffect(() => {
    if (name) {
      setKeyword(name);
      setTimeout(() => {
        const places = new window.kakao.maps.services.Places();
        places.keywordSearch(name, (data, status, pagination) => {
            const pageBox = document.querySelector(".pageBox");
            const resultEl = document.querySelector(".searchResult");
            resultEl.innerHTML = "";
            pageBox.style.display = "block";

            // 지도 API의 마커객체와 그리기 요소를 쉽게 지도 위에 그릴 수 있도록 기능을 제공
            if (status === window.kakao.maps.services.Status.OK) {
              // WGS84 좌표계에서 사각영역 정보를 표현하는 객체를 생성
              const bounds = new window.kakao.maps.LatLngBounds();
              // 검색 시 마커 보이기
              let localPin = [];
              data.forEach((item) => {
                const marker = CreateMarker(item);
                localPin.push(marker);
                bounds.extend(new window.kakao.maps.LatLng(item.y, item.x)); // WGS84 좌표 정보를 가지고 있는 객체를 생성한다.
                appendResultListItem(resultEl, item, marker);
              });
              setMarkers(localPin); // 마커 설정

              if (map !== undefined) {
                console.log(`map >>>>>>>>>>>>>>>`, map);
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정
                map.setBounds(bounds);
                PaginationButton(pagination); // 페이지 버튼 활성
                console.log(`pagination >>> `, pagination);
              }
              // 검색어에 대한 정보가 존재하지 않을시
            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
              pageBox.style.display = "none";
              alert("검색 결과가 존재하지 않습니다.");
              return;
            } else if (status === window.kakao.maps.services.Status.ERROR) {
              pageBox.style.display = "none";
              alert("검색 결과 중 오류가 발생했습니다.");
              return;
            }
          },
          { page: 1 }
        );
      }, 2000);
    }
  }, [map, name]);

  useEffect(() => {
    if (name === "") {
      setKeyword("");
      const pageBox = document.querySelector(".pageBox");
      const resultEl = document.querySelector(".searchResult");
      resultEl.innerHTML = "";
      pageBox.style.display = "none";
      setTimeout(() => {
        const bounds = new window.kakao.maps.LatLngBounds();
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(`geolocation 22222222222222222`, position);
          setLocale((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude // 경도
            },
            isLoading: false,
          }));
          bounds.extend(
            new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          );
          if (map !== undefined) {
            map.setBounds(bounds);
          }
        });
      }, 2000);
      setMarkers([]);
    }
  }, [name])

  // 현재 위치 추적
  const [locale, setLocale] = useState({
    center: {
      // Default : 카카오 본사
      lat: 33.450701,
      lng: 126.570667
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    console.log(`locale &&&&&&&&&&`, locale);
  }, [locale])

  function appendResultListItem(list, item, marker) {
    // 결과 리스트
    const resultList = document.createElement("li");
    resultList.className = "restaurant";
    resultList.addEventListener("click", () => {
      // 리스트 클릭 이벤트
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
    list.appendChild(resultList);
  }

  function handleClick(marker, item) {
    // 클릭시 최근검색 기록에 키워드 추가
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

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옴
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`position 333333333333333`, position);
        setLocale((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude // 경도
          },
          isLoading: false,
        }));
      });
    }
  }, []);
  return (
    <>
      <Fixation>
        <SearchForm method="post" onSubmit={submitKeyword}>
          <input
            className="search-entry"
            placeholder="검색어를 입력해 주세요."
            type="text"
            value={keyword}
            onChange={handleChange}
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
          center={locale.center}
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
          {!locale.isLoading && (
            <MapMarker position={locale.center}></MapMarker>
          )}
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
