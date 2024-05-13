import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import styled from "styled-components";

const RecentSearchHistory = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((response) => {
        setItems(response.data);
        console.log(`response.data >>>`, response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <Outside>
        <PlaceList>
          <h2>최근 검색 기록⏰</h2>
        </PlaceList>
        <ListBox>
          <div className="recentList">
            {items.map((title, i) => {
              return (
                <div className="recentListName" key={i}>
                <p>{title.name}<IoCloseSharp className="delete"/></p>
                </div>
              );
            })}
          </div>
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

    color: #222;
    font-weight: 600;
    font-size: 25px;
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
    font-size: 22px;
  }
`;
