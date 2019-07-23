import React from "react";
import styled from "styled-components";
import "../../App.css";
import cardBg from "../../slice_img/cards/card_bg.svg";
import blackJ from "../../slice_img/cards/black_j.svg";
import blackJ2 from "../../slice_img/cards/black_j2.svg";
import blackQ from "../../slice_img/cards/black_q.svg";
import blackK from "../../slice_img/cards/black_k.svg";
import blackK2 from "../../slice_img/cards/black_k2.svg";
import redJ from "../../slice_img/cards/red_j.svg";
import redJ2 from "../../slice_img/cards/red_j2.svg";
import redQ from "../../slice_img/cards/red_q.svg";
import redK from "../../slice_img/cards/red_k.svg";
import redK2 from "../../slice_img/cards/red_k2.svg";
import cardType1 from "../../slice_img/cards/cardtype_1.svg";
import cardType2 from "../../slice_img/cards/cardtype_2.svg";
import cardType3 from "../../slice_img/cards/cardtype_3.svg";
import cardType4 from "../../slice_img/cards/cardtype_4.svg";
import cardType1s from "../../slice_img/cards/cardtype_1s.svg";
import cardType2s from "../../slice_img/cards/cardtype_2s.svg";
import cardType3s from "../../slice_img/cards/cardtype_3s.svg";
import cardType4s from "../../slice_img/cards/cardtype_4s.svg";
import { ReactComponent as Num1 } from "../../slice_img/cards/num_1.svg";
import { ReactComponent as Num2 } from "../../slice_img/cards/num_2.svg";
import { ReactComponent as Num3 } from "../../slice_img/cards/num_3.svg";
import { ReactComponent as Num4 } from "../../slice_img/cards/num_4.svg";
import { ReactComponent as Num5 } from "../../slice_img/cards/num_5.svg";
import { ReactComponent as Num6 } from "../../slice_img/cards/num_6.svg";
import { ReactComponent as Num7 } from "../../slice_img/cards/num_7.svg";
import { ReactComponent as Num8 } from "../../slice_img/cards/num_8.svg";
import { ReactComponent as Num9 } from "../../slice_img/cards/num_9.svg";
import { ReactComponent as Num10 } from "../../slice_img/cards/num_10.svg";
import { ReactComponent as Num11 } from "../../slice_img/cards/num_11.svg";
import { ReactComponent as Num12 } from "../../slice_img/cards/num_12.svg";
import { ReactComponent as Num13 } from "../../slice_img/cards/num_13.svg";

const CardsBg = styled.div`
  position: relative;
  background: url(${cardBg});
  width: 135px;
  height: 140px;
  box-shadow: 0 -5px 10px rgba(44, 43, 80, 0.1);
  border-radius: 16px;
  margin-bottom: -104px;
  cursor: pointer;
  transition: .2s;
  &:hover {
    transform: translate(0, -10%) rotate(5deg);
    box-shadow: 0 5px 15px rgba(44, 43, 80, 0.1);
  }
`;

const MainImg = styled.div`
  position: absolute;
  width: 135px;
  height: 140px;
  top: 0;
  left: 0;
  background: url(${props => props.img});
  background-repeat: no-repeat;
  background-position: 50% 70%;
`;

const CardInfo = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 6px 18px;
`;

const witchType = type => {
  switch (type) {
    case 1:
      return cardType1s;
    case 2:
      return cardType2s;
    case 3:
      return cardType3s;
    case 4:
      return cardType4s;
    default:
      return cardType1s;
  }
};

const witchMainImg = (number, type) => {
  if (number < 11) {
    switch (type) {
      case 1:
        return cardType1;
      case 2:
        return cardType2;
      case 3:
        return cardType3;
      case 4:
        return cardType4;
      default:
        return cardType1;
    }
  } else {
    switch (type) {
      case 1 :
      switch (number) {
        case 11:
          return blackJ;
        case 12:
          return blackQ;
        case 13:
          return blackK;
        default:
          return blackJ;
      }
      case 2 :
      switch (number) {
        case 11:
          return blackJ2;
        case 12:
          return blackQ;
        case 13:
          return blackK2;
        default:
          return blackJ2;
      }
      case 3 :
      switch (number) {
        case 11:
          return redJ;
        case 12:
          return redQ;
        case 13:
          return redK;
        default:
          return redJ;
      }
      case 4 :
      switch (number) {
        case 11:
          return redJ2;
        case 12:
          return redQ;
        case 13:
          return redK2;
        default:
          return redJ2;
      }
    }
  }
};

const witchNumber = (number, type) => {
  const typeColor = type > 2 ? "NumRed" : "";
  switch (number) {
    case 1:
      return <Num1 className={typeColor} />;
    case 2:
      return <Num2 className={typeColor} />;
    case 3:
      return <Num3 className={typeColor} />;
    case 4:
      return <Num4 className={typeColor} />;
    case 5:
      return <Num5 className={typeColor} />;
    case 6:
      return <Num6 className={typeColor} />;
    case 7:
      return <Num7 className={typeColor} />;
    case 8:
      return <Num8 className={typeColor} />;
    case 9:
      return <Num9 className={typeColor} />;
    case 10:
      return <Num10 className={typeColor} />;
    case 11:
      return <Num11 className={typeColor} />;
    case 12:
      return <Num12 className={typeColor} />;
    case 13:
      return <Num13 className={typeColor} />;

    default:
      return <Num1 className={typeColor} />;
  }
};

const Cards = ({ number, type, ...props }) => {
  return (
    <CardsBg {...props}>
      <CardInfo>
        {witchNumber(number, type)}
        <img src={witchType(type)} alt='cardType' />
      </CardInfo>
      <MainImg img={witchMainImg(number, type)} />
    </CardsBg>
  );
};

export default Cards;
