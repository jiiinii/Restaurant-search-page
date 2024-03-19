import React, {useState} from "react";
import styled from "styled-components";

const ProducerInfo = () => {
  const [num, setNumber] = useState(false);

  return (
    <>
      {!num && (
        <StyledButton
          onClick={() => {
            setNumber(!num);
          }}
        >
          <img src="../img/myProfile.png" alt="profile" />
        </StyledButton>
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
margin: 0 auto;
background-color: #f4e384;
padding: 20px 20px;
box-shadow: 0 5px 15px rgba(0,0,0,0.20);
border-radius: 6.25em;

&:hover {
  cursor: pointer;
  background-color: #f7f7f7;
}

img {
  width : 80px;
  height : 80px;
}
`