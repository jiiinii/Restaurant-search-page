import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

const RecentSearchHistory = () => {
  // items : 현재 상태 값. 초기에는 useState의 인수로 전달된 값([])이 할당
  // setItems : 상태를 업데이트할 수 있는 함수
  const [items, setItems] = useState([]);
  console.log(`items >>> `, items);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const allKeywordRemove = () => {
    if (window.confirm(`모두 삭제할까요?`)) {
      // fetch : 서버로 네트워크 요청을 보내고 응답을 받을 수 있게 해줌.
      fetch(`http://localhost:5000/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(setItems([]));
    }
  };

  const keywordDeelte = () => {
    alert(`삭제`);
  }

  return (
    <>
      <Outside>
        <PlaceList>
          <h2>최근 검색 기록⏰</h2>
          <h4 onClick={allKeywordRemove}>전체삭제</h4>
        </PlaceList>
        <ListBox>
          {items[0] ? ( // items에 값이 있으면? 데이터 출력(true) : 텍스트 출력(false)
            <div className="recentList">
              {items
                .map((title, i) => {
                  return (
                    <div className="recentListName" key={i}>
                      <p>{title.name}<IoClose onClick={keywordDeelte}/></p>
                    </div>
                  );
                })
                .reverse()}
            </div>
          ) : (
            <div className="recentList">
              <div className="recentListName">
                <p>최근 검색 기록이 없습니다.</p>
              </div>
            </div>
          )}
        </ListBox>
      </Outside>
    </>
  );
};

export default RecentSearchHistory;

const Outside = styled.div`
  display: block;
`;

const PlaceList = styled.div`
  display: flex;
  margin: 40px auto 20px;

  h2 {
    margin: auto 10px;

    color: #3a3a3a;
    font-weight: 600;
    font-size: 25px;
  }

  h4 {
    font-size: 15px;
    transform: translate(1000px);
    margin: auto 5px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const ListBox = styled.div`
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: 1300px;
  height: 80px;
  background: #f4e384;

  .recentList {
    width: 1200px;
    height: 40px;
    display: flex;
    margin: auto;
  }

  .recentListName {
    align-self: center;
    vertical-align: middle;
    margin: 10px auto;
  }

  p {
    font-weight: 600;
    font-size: 18px;
    margin: auto;
    color: #3a3a3a;
  }

  .delete {
    background-color: transparent;
    border: none;
  }
`;
