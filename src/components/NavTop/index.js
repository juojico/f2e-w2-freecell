import React from "react";
import styled, { keyframes } from "styled-components";
import freecell from "../../slice_img/ui/logo_freecell.svg";
import { formatTime, formatMove } from "../../utils";

const colorMove = keyframes`
    to {
      filter: hue-rotate(10deg);
    }
`;
const NavTopBg = styled.div`
  box-sizing: border-box;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(93, 127, 217, 1) 0%,
    rgba(137, 87, 237, 1) 100%
  );
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

const NavTop = ({ time = 0, move = 0 }) => {
  return (
    <NavTopBg>
      <img src={freecell} alt="freecell" />
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
