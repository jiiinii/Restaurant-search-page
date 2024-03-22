import React from "react";
import styled from "styled-components";
import ProducerInfo from "../Components/ProducerInfo";
import RecentSearchHistory from "./RecentSearchHistory";
import HomeHeader from "../Components/HomeHeader";

const Home = () => {
  return (
    <>
      <Fixation>
        <Lump>
          <HomeHeader />
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

export default Home;

const Fixation = styled.div`
  width: 1300px;
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
    width: 50px;
    height: 50px;
  }

  .substitute {
    width: 1300px;
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