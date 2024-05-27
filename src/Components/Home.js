import React from "react";
import styled from "styled-components";
import ProducerInfo from "./ProducerInfo";
import RecentSearchHistory from "./RecentSearchHistory";
import Nav from "react-bootstrap/Nav";

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
            <div>
              <img src="../img/mainPhoto.png" alt="representative" />
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
`;