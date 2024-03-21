import React from "react";
import styled from "styled-components";

const RecentSearchHistory = () => {
  return (
    <>
    <Outside>
      <PlaceList>
        <h2>최근 검색 기록⏰</h2>
      </PlaceList>
      <ListBox>
        <img src="../img/placeimg.png" alt="substitute"/>
        <img src="../img/placeimg.png" alt="substitute"/>
        <img src="../img/placeimg.png" alt="substitute"/>
      </ListBox>
    </Outside>
    </>
  );
};

export default RecentSearchHistory;

const Outside = styled.div`
    display: block;
`

const PlaceList = styled.div`
  display: flex;
  margin: 40px auto  20px;

  h2 {
    margin: auto 10px;

    color: #222;
    font-family: Gaegu;
    font-size: 30px;
  }
`;

const ListBox = styled.div`
  border: none;
  border-radius: 10px;
  display: block;
  width: 1300px;
  height: 380px;
  background: #f4e384;

  img {
    margin: 30px;
  }
`;
