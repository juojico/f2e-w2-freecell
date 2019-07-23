import React from "react";
import styled, { keyframes } from "styled-components";
import startPage from '../slice_img/ui/startpage_bg.jpg';
import castle from '../slice_img/ui/img_castle.svg';
import Button from "../components/Button";
import { ReactComponent as CardType1s } from "../slice_img/cards/cardtype_1s.svg";
import { ReactComponent as CardType2s } from "../slice_img/cards/cardtype_2s.svg";
import { ReactComponent as CardType3s } from "../slice_img/cards/cardtype_3s.svg";
import { ReactComponent as CardType4s } from "../slice_img/cards/cardtype_4s.svg";

const MainBoxMV = keyframes`
    from {
        bottom: -250px;
    }
`

const StartWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: ${props => props.open ? '100%' : '0'};
    top: 0;
    left: 0;
    background: url(${startPage});
    background-size: cover;
    background-position: top;
    overflow: hidden;
    transition: .5s;
    z-index: 50;
`;

const BottomBg = styled.div`
    position: absolute;
    width: 100%;
    height: 27vh;
    bottom: 0;
    background: #2C2B50;
`;

const MainBox = styled.div`
    position: absolute;
    height: 450px;
    bottom: 0;
    left: 50%;
    background: url(${castle});
    background-size: 60%;
    background-position: top;
    background-repeat: no-repeat;
    transform: translate(-50%);
    animation: ${MainBoxMV} 1s;
    z-index: 60;
    h1 {
        color: #9E99FF;
        margin-top: 40px;
        text-align: center;
        font-weight: 200;
    }
`;

const MainBtn = styled(Button)`
    font-size:3.25em;
    font-weight: 500;
    padding: 16px 50px;
    margin-top: 190px;
    border-radius: 1.5em;
    letter-spacing: .1em;
    box-shadow: 0 10px 30px rgba(49, 20, 78, 0.5);
`

const TypesBox = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 33%;
    left: 50%;
    width: 190px;
    transform: translate(-50%, -50%);
    & svg {
        transform: scale(1.375);
        path {
            fill: #A1C8FF;
        }
    }
`


const StartContainer = ({ open, onClick }) => {
    return (
        <StartWrapper open={open}>
            <MainBox>
                <MainBtn text='START' onClick={onClick}></MainBtn>
                <h1>How to play?</h1>
            </MainBox>
            <TypesBox><CardType1s /><CardType2s /><CardType3s /><CardType4s /></TypesBox>
            <BottomBg></BottomBg>
        </StartWrapper>
    );
};

export default StartContainer;
