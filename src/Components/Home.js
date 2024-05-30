import React, { useState } from "react";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ProducerInfo from "./ProducerInfo";
import RecentSearchHistory from "./RecentSearchHistory";

const HomeNav = () => {
  const images = ["../img/mainPhoto1.png", "../img/mainPhoto2.png", "../img/mainPhoto3.png"];

  // 수동
  const [curSlide, setCurSlide] = useState(0);

  const firstSlideIndex = 0; // 이미지 슬라이드의 시작 번호
  const lastSlideIndex = images.length - 1; // 이미지 슬라이드의 끝 번호
  const moveSlideIndex = 1; // 이미지 슬라이드 이동 값

  const moveToSlide = (value) => {
    if (value === 'next') {
      // 슬라이드 끝점에 도달했을 때 curSlide의 값을 바꿔 처음으로 돌아가게 함.
      setCurSlide((prevState) =>
        prevState < lastSlideIndex
          ? prevState + moveSlideIndex
          : firstSlideIndex
      );
    }
    if (value === 'prev') {
      // 슬라이드 시작점에 도달했을 때 curSlide의 값을 바꿔 마지막으로 돌아가게 함.
      setCurSlide((prevState) =>
        prevState > firstSlideIndex
          ? prevState - moveSlideIndex
          : lastSlideIndex
      );
    }
  };

  // 자동
  const [intervalId, setIntervalId] = useState(null);

  const autoMoveSlide = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    setIntervalId(
      setInterval(() => {
        setCurSlide((prevState) =>
          prevState < lastSlideIndex
            ? prevState + moveSlideIndex
            : firstSlideIndex
        );
      }, 3000)
    );
  }

  useState(() => {
    autoMoveSlide();
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Fixation>
        <Lump>
          <header>
            <h1>
              맛 :지도
              <img className="logo" src="../img/logo.png" alt="logo" />
            </h1>
            <ul>
              <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                  <Nav.Link href="/">홈</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/search">맛집 찾기</Nav.Link>
                </Nav.Item>
              </Nav>
            </ul>
          </header>
          <main>
            <div className="imageTrain">
              <div className="imageShow">
                {images.map((item, index) => (
                  <div
                    className="compartment"
                    key={index}
                    style={{
                      transform: `translateX(${-1300 * curSlide}px)`, // 현재 이미지 번호의 값을 넣어준다.
                      transition: "all 0.4s ease-in-out",
                    }}
                  >
                    <img src={item} alt="imgs"></img>
                  </div>
                ))}
              </div>
              <IoIosArrowBack
                className="prev-button"
                onClick={() => moveToSlide('prev')}
              />
              <IoIosArrowForward
                className="next-button"
                onClick={() => moveToSlide('next')}
              />
            </div>
          </main>
        </Lump>
        <RecentSearchHistory />
      </Fixation>
      <ProducerInfo />
    </>
  );
};

export default HomeNav;

const Fixation = styled.div`
  width: 1300px;
  margin: 40px auto;

  header {
    display: flex;
    margin: 0px auto 30px;
  }

  h1 {
    width: 200px;
    font-family: Stylish;
    font-size: 3em;
    font-color: #222;
  }

  .logo {
    width: 50px;
    height: 50px;
  }
`;

const Lump = styled.div`
  display: block;

  img {
    border-radius: 10px;
  }

  ul {
    margin: 10px 20px 10px;
  }

  .imageTrain {
    display: flex;
    justify-content: center;

    .prev-button {
      position: absolute;
      top: 350px;
      transform: translate(-630px);
      color: #626262;
      width: 40px;
      height: 40px;
      &:hover {
        cursor: pointer;
      }
    }

    .next-button {
      position: absolute;
      top: 350px;
      transform: translate(630px);
      color: #626262;
      width: 40px;
      height: 40px;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .imageShow {
    display: flex;
    width: 1300px;
    height: 485px;
    overflow: hidden;
    border-radius: 10px;
    text-align: center;
    font-size: 40px;
  }

  .compartment {
    width: 100%;
    height: 300px;
    flex-shrink: 0;
    font-size: 40px;
    text-align: center;
  }
`;
