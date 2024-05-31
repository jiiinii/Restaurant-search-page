import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Box = styled.div`
  background-color: tomato !important;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    background-color: teal;
  }
  .slick-slide div {
    outline: none;
    background-color: orange;
    width: 60%;
    margin: 0 auto;
  }
`;
export { StyledSlider, Box };