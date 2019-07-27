import React from "react";
import styled, { keyframes } from "styled-components";
import Button from "../components/Button";
import Firework from "../components/Firework";
import DialogBg from "../components/Dialog/DialogBg";

const MainBoxMV = keyframes`
    from {
        bottom: -250px;
    }
`;

const WinWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => (props.open ? "100%" : "0")};
  top: 0;
  left: 0;
  overflow: hidden;
  transition: 0.5s;
  z-index: 50;
`;

const MainBox = styled.div`
  position: absolute;
  height: 450px;
  bottom: 0;
  left: 50%;
  color: white;
  text-align: center;
  transform: translate(-50%);
  animation: ${MainBoxMV} 1s;
  z-index: 60;
  h1 {
    margin-top: 24px;
    font-weight: 200;
  }
`;

const MainBtn = styled(Button)`
  font-size: 3.25em;
  font-weight: 500;
  padding: 16px 50px;
  margin-top: 190px;
  border-radius: 1.5em;
  letter-spacing: 0.1em;
  box-shadow: 0 10px 30px rgba(49, 20, 78, 0.5);
`;

const WinContainer = ({ open, onClick }) => {
  return (
    <WinWrapper open={open}>
      <MainBox>
        <h1>Congratulations! You Won the Game.</h1>
        <MainBtn text='RESTART' onClick={onClick} />
      </MainBox>

      <Firework open={open} />
      <DialogBg />
    </WinWrapper>
  );
};

export default WinContainer;
