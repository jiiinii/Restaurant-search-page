import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import ProducerInfo from "./ProducerInfo";
import RecentSearchHistory from "./RecentSearchHistory";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HomeNav = () => {
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
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                <SwiperSlide><img src="../img/mainPhoto1.png" alt="img1"></img></SwiperSlide>
                <SwiperSlide><img src="../img/mainPhoto2.png" alt="img2"></img></SwiperSlide>
                <SwiperSlide><img src="../img/mainPhoto3.png" alt="img3"></img></SwiperSlide>
                </Swiper>
              </div>
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
