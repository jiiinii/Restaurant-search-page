import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const RecentSearchHistory = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:5000/api/items")
        .then((response) => {
          setItems(response.data)
          console.log(`response.data >>>`, response.data);
        })
        .catch((error) => console.error(`dddd>>> `, error));
    }, []);
  return (
    <>
      <Outside>
        <PlaceList>
          <h2>최근 검색 기록⏰</h2>
        </PlaceList>
        <ListBox />
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
  display: block;
  width: 1300px;
  height: 100px;
  background: #f4e384;
`;
