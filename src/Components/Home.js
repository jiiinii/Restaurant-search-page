import React from "react";
import styled from "styled-components";
import ProducerInfo from "../Components/ProducerInfo";

const Home = () => {
  return (
    <>
    <Fixation>
      <h1>맛 :지도<img src ="../img/logo.png" alt = "logo"/></h1>
      <figure></figure>
      </Fixation>
      <ProducerInfo />
    </>
  );
};

export default Home;

const Fixation = styled.div`
  width: 960px;
  margin: 40px auto;

  h1 {
    width: 200px;
    font-family: Stylish;
    font-size: 3em;
  }

  img {
    width : 40px;
    height : 35px;
  }
`