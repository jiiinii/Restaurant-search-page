import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CreateMarker from "../Components/CreateMarker";
import PaginationButton from "../Components/PaginationButton";
import UseKakaoLoader from "./UseKakaoLoader";
import styled from "styled-components";

function KakaoMapEvent({ name }) {
  UseKakaoLoader();
  const [markers, setMarkers] = useState([]);
  const [keyword, setKeyword] = useState("");
  let map;
  let setInfo;

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

        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new window.kakao.maps.LatLng("", ""), // 지도의 중심좌표
            level: 10, // 지도의 확대 레벨
          };

        map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        places.keywordSearch(name, (data, status, pagination) => {
            const pageBox = document.querySelector(".pageBox");
            const resultEl = document.querySelector(".searchResult");
            pageBox.innerHTML = "";
            resultEl.innerHTML = "";
            pageBox.style.display = "block";

            // 지도 API의 마커객체와 그리기 요소를 쉽게 지도 위에 그릴 수 있도록 기능을 제공
            if (status === window.kakao.maps.services.Status.OK) {
              // WGS84 좌표계에서 사각영역 정보를 표현하는 객체를 생성
              const bounds = new window.kakao.maps.LatLngBounds();
              // // 검색 시 마커 보이기
              let localPin = [];
              data.forEach((item) => {
                const marker = CreateMarker(item);
                localPin.push(marker);

                const markerPosition = new window.kakao.maps.LatLng(item.y, item.x);
                new window.kakao.maps.Marker({ map, position: markerPosition });

                bounds.extend(new window.kakao.maps.LatLng(item.y, item.x)); // WGS84 좌표 정보를 가지고 있는 객체를 생성한다.
                appendResultListItem(resultEl, item, marker);
              });
              setMarkers(localPin); // 마커 설정

              if (map !== undefined) {
                console.log(`map >>>>>>>>>>>>>>>`, map);
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정
                map.setBounds(bounds);
                PaginationButton(pagination); // 페이지 버튼 활성
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
      }, 200);
    }
  }, [map, name]);

  useEffect(() => {
    if (name === "" && navigator.geolocation) {
      setKeyword("");
      const pageBox = document.querySelector(".pageBox");
      const resultEl = document.querySelector(".searchResult");
      resultEl.innerHTML = "";
      pageBox.style.display = "none";
      setTimeout(() => {
        const bounds = new window.kakao.maps.LatLngBounds();
        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new window.kakao.maps.LatLng("", ""), // 지도의 중심좌표
            level: 10, // 지도의 확대 레벨
          };
        map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        navigator.geolocation.getCurrentPosition((position) => {
          var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          var locPosition = new window.kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?</div>'; // 인포윈도우에 표시될 내용입니다

          // 마커와 인포윈도우를 표시합니다
          displayMarker(locPosition, message);

          console.log(`geolocation 22222222222222222`, position);
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
        console.log(`@@@`);
      }, 200);
    }    
  }, [name]);

  function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new window.kakao.maps.Marker({  
        map: map, 
        position: locPosition
    }); 
    
    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new window.kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, marker);
    
    console.log(`locPosition >>>>>>>> `, locPosition);
    console.log(`locPosition map >>>>>>>> `, map);
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);     
}

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
      <div id="map" style={{ width: "100%", height: "650px" }}></div>
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
