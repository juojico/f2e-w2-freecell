import React from "react";
import styled, { keyframes } from "styled-components";
import freecell from "../../slice_img/ui/logo_freecell.svg";

const colorMove = keyframes`
    to {
        background-position: 100% 0%;
    }
`
const NavTopBg = styled.div`
  box-sizing: border-box;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(93, 127, 217, 1) 0%,
    rgba(137, 87, 237, 1) 100%
  );
  background-size: 200%;
  width: 100%;
  height: 60px;
  padding: 14px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: ${colorMove} 3s alternate infinite;
`;

const Board = styled.div`
  color: white;
  span {
    font-size: 2em;
    margin-left: 0.25em;
    margin-right: 0.75em;
  }
`;

const formatTime = time => {
  let minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  let hours = 0;
  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);
  }
  return (
    (hours ? hours + ":" : "") +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds
  );
};

const formatMove = move => {
  return (move < 10 ? "0" : "") + move;
};

const NavTop = ({ time = 1234, move = 9 }) => {
  return (
    <NavTopBg>
      <img src={freecell} alt='freecell' />
      <Board>
        <small>TIME:</small>
        <span>{formatTime(time)}</span>
        <small>MOVE:</small>
        <span>{formatMove(move)}</span>
      </Board>
    </NavTopBg>
  );
};

export default NavTop;
