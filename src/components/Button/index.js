import React from "react";
import styled from "styled-components";

const ButtonBg = styled.div`
  box-sizing: border-box;
  position: relative;
  background: #ff6f72;
  border-radius: 24px;
  color: white;
  font-weight: bolder;
  padding: 10px 44px;
  margin: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  letter-spacing: 2px;
  cursor: pointer;
`;

const Button = ({ text, ...props }) => {
  return <ButtonBg {...props}>{text}</ButtonBg>;
};

export default Button;
