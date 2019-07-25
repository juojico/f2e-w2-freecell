import React from "react";
import styled, { keyframes } from "styled-components";
import stop from "../../slice_img/icons/icons_stop.svg";
import pause from "../../slice_img/icons/icons_pause.svg";
import undo from "../../slice_img/icons/icons_undo.svg";
import tips from "../../slice_img/icons/icons_tips.svg";
import threecards from "../../slice_img/ui/img_threecards.svg";
import Button from "../../components/Button";

const colorMove = keyframes`
    to {
      filter: hue-rotate(10deg);
    }
`;

const ControllerBg = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 735px;
  max-width: 100%;
  height: 72px;
  bottom: 0;
  left: 50%;
  margin-bottom: ${props => (props.hidden ? "-150px" : "0")};
  border-radius: 20px 20px 0 0;
  background: linear-gradient(
    135deg,
    rgba(93, 127, 217, 1) 0%,
    rgba(137, 87, 237, 1) 100%
  );
  box-shadow: 0 -10px 25px rgba(47, 43, 54, 0.8);
  transform: translate(-50%);
  transition: 0.5s;
  animation: ${colorMove} 3s alternate infinite;
`;

const ControllBtn = styled.div`
  width: 72px;
  height: 72px;
  background-image: url(${props => props.icon});
  cursor: pointer;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
  transition: 0.2s;
  span {
    display: block;
    width: 100%;
    margin-top: 80%;
    color: white;
    font-size: 0.825em;
    text-align: center;
    white-space: nowrap;
    opacity: 0;
    transition: 0.2s;
  }
  &:hover {
    margin-top: -20px;
    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.8));
    span {
      opacity: 1;
    }
  }
`;

const UndoBtn = styled.div`
  height: 100px;
  background: url(${threecards});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: -80px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    margin-top: -90px;
  }
  & > div {
    margin-top: 44%;
  }
`;

const Controller = ({ onStop, onPause, onUndo, onRestart, onTips, hidden }) => {
  return (
    <ControllerBg hidden={hidden}>
      <ControllBtn icon={stop} onClick={onStop}>
        <span>New Game</span>
      </ControllBtn>
      <ControllBtn icon={pause} onClick={onPause}>
        <span>Pause</span>
      </ControllBtn>
      <UndoBtn onClick={onUndo}>
        <Button text={"UNDO"} />
      </UndoBtn>
      <ControllBtn icon={undo} onClick={onRestart}>
        <span>Restart</span>
      </ControllBtn>
      <ControllBtn icon={tips} onClick={onTips}>
        <span>Hint</span>
      </ControllBtn>
    </ControllerBg>
  );
};

export default Controller;
