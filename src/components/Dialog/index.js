import React from "react";
import styled from "styled-components";
import Cloud from "../../slice_img/ui/img_cloud.svg";
import Button from "../../components/Button";

const DialogWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: ${props => (props.open ? "0" : "100%")};
  left: 0;
  z-index: 100;
  transition: 0.5s ease-in-out;
`;

const DialogBg = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(${Cloud});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  pointer-events: none;
  filter: blur(6px);
  z-index: 90;
`;

const DialogBox = styled.div`
  position: absolute;
  width: 640px;
  height: 320px;
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

const Dialog = ({
  open,
  data
}) => {
  return (
    <DialogWrapper open={open}>
      <DialogBox open={open}>
        <h2>{data.text}</h2>
        <BtnBox>
          <Button text={data.btn1Text} onClick={data.btn1Click} type={data.btn1Type} />
          {data.only ? null : <Button text={data.btn2Text} onClick={data.btn2Click} type={data.btn2Type} />}
        </BtnBox>
      </DialogBox>
      <DialogBg />
    </DialogWrapper>
  );
};

export default Dialog;
