import React from "react";
import styled, { keyframes } from "styled-components";
import Button from "../components/Button";
import castle from "../slice_img/ui/img_castle.svg";
import startPage from "../slice_img/ui/startpage_bg.jpg";
import { ReactComponent as CardType1s } from "../slice_img/cards/cardtype_1s.svg";
import { ReactComponent as CardType2s } from "../slice_img/cards/cardtype_2s.svg";
import { ReactComponent as CardType3s } from "../slice_img/cards/cardtype_3s.svg";
import { ReactComponent as CardType4s } from "../slice_img/cards/cardtype_4s.svg";

const DIFFICULT_LV = ["easy", "normal", "hard"];

const MainBoxMV = keyframes`
    from {
        bottom: -250px;
    }
`;

const IconMV = keyframes`
    75% {
      transform: scale(1.375);
    }
    to {
      transform: scale(1.375) rotate(360deg);
    }
`;

const StartWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => (props.open ? "110%" : "0")};
  top: 0;
  left: 0;
  background-color: #2c2b50;
  background-image: url(${startPage});
  background-size: auto;
  background-position: top;
  background-repeat: no-repeat;
  overflow: hidden;
  transition: 1.5s;
  z-index: 150;
  ${({ open }) =>
    open
      ? "clip-path: polygon(0% 0%,100% 0%,100% 100%,50% 100%,0 100%);"
      : "clip-path: polygon(0% 0%,100% 0%,100% 0%,50% -200%,0 0%);"}
`;

const BottomBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 585px;
  background: #2c2b50;
`;

const MainBox = styled.div`
  position: absolute;
  height: 450px;
  top: 345px;
  left: 50%;
  color: #9e99ff;
  text-align: center;
  background: url(${castle});
  background-size: 60%;
  background-position: top;
  background-repeat: no-repeat;
  transform: translate(-50%);
  animation: ${MainBoxMV} 1s;
  z-index: 60;
  h1 {
    margin-top: 24px;
    font-weight: 200;
  }
  span {
    font-size: 1.25em;
    margin: 0 0.5em;
    opacity: 0.7;
    cursor: pointer;
    &:hover,
    &:active,
    &[active="true"] {
      opacity: 1;
      text-shadow: 0 0 10px #9e99ff;
    }
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

const TypesBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 250px;
  left: 50%;
  width: 190px;
  transform: translate(-50%, -50%);
  & svg {
    transform: scale(1.375);
    animation: ${IconMV} 4s infinite;
    path {
      fill: #a1c8ff;
    }
    &:nth-child(4n + 2) {
      animation: ${IconMV} 4s 0.2s infinite;
    }
    &:nth-child(4n + 3) {
      animation: ${IconMV} 4s 0.4s infinite;
    }
    &:nth-child(4n) {
      animation: ${IconMV} 4s 0.6s infinite;
    }
  }
`;

const StartContainer = ({ open, onClick, setDifficult, nowDifficult }) => {
  return (
    <StartWrapper open={open}>
      {open ? (
        <>
          {" "}
          <MainBox>
            <MainBtn text="START" onClick={onClick} />
            {DIFFICULT_LV.map((item, index) => {
              const active = nowDifficult === index ? "true" : "false";
              return (
                <span
                  key={`difficult${index}`}
                  onClick={() => setDifficult(index)}
                  active={active}
                >
                  {item}
                </span>
              );
            })}
            <h1>How to play?</h1>
          </MainBox>
          <TypesBox>
            <CardType1s />
            <CardType2s />
            <CardType3s />
            <CardType4s />
          </TypesBox>
          <BottomBg />
        </>
      ) : (
        ""
      )}
    </StartWrapper>
  );
};

export default StartContainer;
