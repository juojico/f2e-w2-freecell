import React from "react";
import styled from "styled-components";

const ButtonBg = styled.div`
  box-sizing: border-box;
  position: relative;
  background: #FF6F72;
  border-radius: 24px;
  color: white;
  font-weight: bolder;
  padding: 10px 44px;
  margin-top: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  letter-spacing: 2px;
`;

const Button = ({ text }) => {
  return <ButtonBg>{text}</ButtonBg>;
};

export default Button;
