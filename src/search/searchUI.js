import React from "react";
import styled from "styled-components";

const searchUI = () => {
  return (
    <>
      <Fixation>
        <SearchForm>
          <input
            className="search-entry"
            placeholder="검색어를 입력해 주세요."
          ></input>
          <div>
            <button className="btn">Search</button>
          </div>
        </SearchForm>
        <SearchResult></SearchResult>
      </Fixation>
    </>
  );
};

export default searchUI;

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