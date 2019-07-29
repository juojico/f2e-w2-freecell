import React from "react";
import styled from "styled-components";
import DialogBg from "./DialogBg";
import Button from "../../components/Button";

const DialogWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => (props.open ? "100%" : "0")};
  top: ${props => (props.open ? "0" : "100%")};
  left: 0;
  overflow: hidden;
  z-index: 100;
  transition: 0.5s ease-in-out;
`;

const DialogBox = styled.div`
  position: absolute;
  width: 300px;
  height: 200px;
  top: ${props => (props.open ? "50%" : "48%")};
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  transition: 0.2s 0.5s ease-out;
  z-index: 110;
  h2 {
    text-align: center;
    font-weight: 500;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-item: center;
`;

const Dialog = ({ open, data, btn1Click, btn2Click }) => {
  return (
    <DialogWrapper open={open}>
      <DialogBox open={open}>
        <h2>{data.text}</h2>
        <BtnBox>
          <Button
            text={data.btn1Text}
            onClick={btn1Click}
            type={data.btn1Type}
          />
          {data.only ? null : (
            <Button
              text={data.btn2Text}
              onClick={btn2Click}
              type={data.btn2Type}
            />
          )}
        </BtnBox>
      </DialogBox>
      <DialogBg />
    </DialogWrapper>
  );
};

export default Dialog;
