import React from "react";
import Nav from "react-bootstrap/Nav";

const HomeHeader = () => {
  return (
    <>
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
    </>
  );
};

export default HomeHeader;