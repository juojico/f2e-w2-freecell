import React from 'react';
import styled from 'styled-components';
import cardBg from '../../slice_img/cards/card_bg.svg';
import blackQ from '../../slice_img/cards/black_q.svg';
import num12 from '../../slice_img/cards/num_12.svg';
import cardType1s from '../../slice_img/cards/cardtype_1s.svg';

const CardsBg = styled.div`
    position: relative;
    background: url(${cardBg});
    width: 135px;
    height: 140px;
    box-shadow: 0 -5px 10px rgba(44, 43, 80, .1);
`

const MainImg = styled.div`
    position: absolute;
    background: url(${blackQ});
    width: 135px;
    height: 140px;
    top: 0;
    left: 0;
`

const CardInfo = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 6px 18px;
}


`

class Cards extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <CardsBg>
                <CardInfo>
                <img src={num12} />
                <img src={cardType1s} />
                </CardInfo>
                <MainImg />
            </CardsBg>
        );
    }
}

export default Cards;