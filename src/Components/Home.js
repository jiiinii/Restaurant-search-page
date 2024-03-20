import React from "react";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import ProducerInfo from "../Components/ProducerInfo";

const Home = () => {
  return (
    <>
      <Fixation>
        <header>
          <h1>
            맛 :지도
            <img className = "logo" src="../img/logo.png" alt="logo" />
          </h1>
          <ul>
            <Nav variant="tabs" defaultActiveKey="/">
              <Nav.Item>
                <Nav.Link href="/">홈</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">맛집 찾기</Nav.Link>
              </Nav.Item>
            </Nav>
          </ul>
        </header>
        <main>
          <img className = "substitute" src="../img/substitute.png" alt="substitute" />
        </main>
      </Fixation>
      <ProducerInfo />
    </>
  );
};

export default Home;

const Fixation = styled.div`
  width: 1200px;
  margin: 40px auto;

  header {
    display: flex;
    margin: 0px auto 20px;
  }

  h1 {
    width: 200px;
    font-family: Stylish;
    font-size: 3em;
    font-color: #222;
  }

  .logo {
    width: 40px;
    height: 35px;
  }

  .substitute {
    width: 1200px
  }

  main {
    margin: 0px auto;
  }
`;
