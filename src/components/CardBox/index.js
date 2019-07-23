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
  height: 140px;
  background: ${props =>
    props.type === "finish"
      ? "rgba(158, 153, 255, .5)"
      : "rgba(158, 153, 255, .2)"};
  border-radius: 16px;
  &>svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -48%);
    pointer-events: none;
    path {
      fill: rgba(158, 153, 255, 0.6);
    }
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
const CardBox = ({ type = "table", cardType = 1, children }) => {
  return (
    <CardBoxBg type={type} cardType={cardType}>
      {type === "finish" ? witchCardType(cardType) : ""}
      {children}
    </CardBoxBg>
  );
};

export default CardBox;
