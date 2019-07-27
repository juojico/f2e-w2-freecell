import React from "react";
import styled, { keyframes } from "styled-components";
import Button from "../components/Button";
import Firework from "../components/Firework";
import DialogBg from "../components/Dialog/DialogBg";
import threecards from "../slice_img/ui/img_threecards.svg";
import { formatTime, formatMove } from "../utils";

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
  bottom: 10%;
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

const BtnBox = styled.div`
  display: inline-block;
  width: 300px;
  padding-top: 115px;
  text-align: center;
  background: url(${threecards});
  background-position: top center;
  background-repeat: no-repeat;
`;

const MainBtn = styled(Button)`
  font-size: 2em;
  font-weight: 500;
  padding: 16px 50px;
  border-radius: 1.5em;
  letter-spacing: 0.1em;
  box-shadow: 0 10px 30px rgba(49, 20, 78, 0.5);
`;

const Board = styled.div`
  position: absolute;
  color: white;
  top: 20%;
  left: ${props=>props.left};
  & > h1 {
    margin: 0;
    font-size: 4em;
    font-weight: 400;
    text-shadow: 0 0 8px #efddff;
  }
  & > h2 {
    margin: 0;
    color: #9e99ff;
    font-weight: 500;
  }
`;

const WinContainer = ({ open, time, move, onClick1, onClick2 }) => {
  return (
    <WinWrapper open={open}>
      {open ? (
        <>
          <MainBox>
            <h1>Congratulations! You Won the Game.</h1>
            <Board left='-10%'>
              <h2>TIME</h2>
              <h1>{formatTime(time)}</h1>
              <h2 small='true'>move</h2>
              <h1 small='true'>{formatMove(move)}</h1>
            </Board>
            <BtnBox>
              <MainBtn text="RESTART" onClick={onClick1} />
              <MainBtn text="HOME" onClick={onClick2} />
            </BtnBox>
            <Board left='78%'>
              <h2>BEST</h2>
              <h1>{formatTime(JSON.parse(localStorage.freecellBest).time)||'?'}</h1>
              <h2 small='true'>move</h2>
              <h1 small='true'>{formatMove(JSON.parse(localStorage.freecellBest).move)||'?'}</h1>
            </Board>
          </MainBox>

          <Firework />
          <DialogBg />
        </>
      ) : (
        ""
      )}
    </WinWrapper>
  );
};

export default WinContainer;
