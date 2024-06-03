import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Nav from "react-bootstrap/Nav";
import ProducerInfo from "./ProducerInfo";
import RecentSearchHistory from "./RecentSearchHistory";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeNav = () => {
  const settings = {
    dots: true,
    infinite: true, // 무한슬라이더 여부
    slidesToShow: 1, // 한번에 몇개 슬라이드 보여줄 것인지
    slidesToScroll: 1,
    autoplay: true, // 자동재생 여부
    autoplaySpeed: 3000,
  };
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
            <StyledSlider {...settings}>
              <div>
                <img src="../img/mainPhoto1.png" alt="img1" />
              </div>
              <div>
                <img src="../img/mainPhoto2.png" alt="img2" />
              </div>
              <div>
                <img src="../img/mainPhoto3.png" alt="img3" />
              </div>
            </StyledSlider>
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

  .compartment {
    width: 100%;
    height: 300px;
    flex-shrink: 0;
    font-size: 40px;
    text-align: center;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
    width: 1300%;
    margin: 0 auto;
    border-radius: 10px;
  }
`;
