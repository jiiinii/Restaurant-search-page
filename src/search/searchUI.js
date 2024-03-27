import React from "react";
import styled from "styled-components";

const searchUI = () => {
  return (
    <>
      <SearchForm>
        <input className="search-entry"></input>
        <div>
          <button className="btn">Search</button>
        </div>
      </SearchForm>
    </>
  );
};

export default searchUI;

const SearchForm = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 10px;
  align-items: baseline;
  margin-right: 50px;

  .search-entry {
    background-color: #efe4a2;
    padding: 0px 20px 0px 20px;
    width: 350px;
    height: 50px;
    position: relative;
    border: 3px solid #efe4a2;
    border-radius: 10px;
    font-size: 12px;
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
    box-sizing: border-box;

    &:hover {
      cursor: pointer;
      background-color: #f7f7f7;
    }
  }
`;
