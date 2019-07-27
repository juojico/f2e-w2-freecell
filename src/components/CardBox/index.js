import React from "react";
import styled from "styled-components";
import { ReactComponent as CardType1 } from "../../slice_img/cards/cardtype_1.svg";
import { ReactComponent as CardType2 } from "../../slice_img/cards/cardtype_2.svg";
import { ReactComponent as CardType3 } from "../../slice_img/cards/cardtype_3.svg";
import { ReactComponent as CardType4 } from "../../slice_img/cards/cardtype_4.svg";

const CardBoxBg = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 135px;
  height: ${({ type }) => (type === "table" ? "none" : "140px")};
  min-height: 140px;
  background: ${props =>
    props.type === "finish"
      ? "rgba(158, 153, 255, .5)"
      : "rgba(158, 153, 255, .2)"};
  border-radius: 16px;
  user-select: none;
  & > svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -48%);
    pointer-events: none;
    path {
      fill: rgba(158, 153, 255, 0.6);
    }
  }
  & > div:last-child {
    ${({ hint }) => hint?'box-shadow: inset 0 0 10px rgb(255, 244, 60), 0 0 15px rgb(255, 244, 60);':''}
  }
`;

const witchCardType = cardType => {
  switch (cardType) {
    case 1:
      return <CardType1 />;
    case 2:
      return <CardType2 />;
    case 3:
      return <CardType3 />;
    case 4:
      return <CardType4 />;
    default:
      return <CardType1 />;
  }
};
const CardBox = ({
  type = "table",
  cardType = 1,
  children,
  onDragOver,
  onDrop,
  hint=false,
  ...props
}) => {
  return (
    <CardBoxBg
      type={type}
      cardType={cardType}
      onDragOver={onDragOver}
      onDrop={onDrop}
      hint={hint}
      {...props}
    >
      {type === "finish" ? witchCardType(cardType) : ""}
      {children}
    </CardBoxBg>
  );
};

export default CardBox;
