import React, { useState } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

const ProducerInfo = () => {
  const [display, setDisplay] = useState(false);

  return (
    <>
      {!display && (
        <StyledButton
          onClick={() => {
            setDisplay(!display);
          }}
        >
          <img src="../img/myProfile.png" alt="profile" />
        </StyledButton>
      )}
      {display && (
        <InfoDiv id="informationdiv">
          <Div>
            <div>
              <p>맛 :지도</p>
            </div>
            <button
              onClick={() => {
                setDisplay(!display);
              }}
            >
              <GrClose />
            </button>
          </Div>
          <h2>
            전국 곳곳의 숨은 맛집을
            <br />
            맛 :지도 를 통해서 알아보세요😊
          </h2>
          <LinkTag
            href="https://github.com/jiiinii"
            target="_blank"
            rel="noreferrer"
          >
            맛 :지도 개발자 github
          </LinkTag>
          <LinkTag
            href="https://www.instagram.com/_doom_chit?igsh=YnNuNHo4aXdxZXR6&utm_source=qr"
            target="_blank"
            rel="noreferrer"
          >
            맛 :지도 개발자 instagram
          </LinkTag>
        </InfoDiv>
      )}
    </>
  );
};

export default ProducerInfo;

const StyledButton = styled.button`
  border: none;
  display: block;
  text-align: center;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  font-weight: 700;
  font-size: 15px;
  margin: 0 50px;
  background-color: #f4e384;
  padding: 20px 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 6.25em;

  &:hover {
    cursor: pointer;
    background-color: #f7f7f7;
  }

  img {
    width: 80px;
    height: 80px;
  }
`;

const InfoDiv = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 1.875em;
  left: 2.1875em;

  background-color: #efe4a2;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;

  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 1200px) {
    background-color: #efe4a2;
  }

  @media (max-width: 480px) {
    width: 332px;
  }

  @media (max-width: 365px) {
    border-radius: 40px;
    width: 268px;
  }

  h2 {
    margin: 0 73px 30px 54px;
    font-weight: 600;
    font-size: 20px;
    color: #222;
  }
`;

const Div = styled.div`
  display: flex;

  div {
    margin: 32px 15px 31px 36px;
    width: 150px;
    height: 63px;

    @media (max-width: 480px) {
      margin: 25px 15px 20px 20px;
      width: 55px;
      height: 55px;
    }

    @media (max-width: 365px) {
      margin: 25px 10px 15px 20px;
      width: 40px;
      height: 40px;
    }

    p {
      font-size: 2.5em;
      font-family: Stylish;
    }
  }

  button {
    position: absolute;
    width: 35px;
    height: 35px;
    margin-top: 20px;
    right: 2em;
    background: transparent;
    border: none;

    :hover {
        cursor: pointer;
      }
`;

const LinkTag = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 334px;
  height: 80px;
  margin-bottom: 30px;

  font-size: 18px;
  font-weight: 700;
  text-decoration-line: none;
  color: #222;

  background: #f7f7f7;
  border-line: none;
  border-radius: 30px;

  &:hover {
    cursor: pointer;
    background: #e0d373;
  }
`;
