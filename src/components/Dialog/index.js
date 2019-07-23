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
  text,
  btn1Text = "取消",
  btn2Text = "確定",
  btn1Click,
  btn2Click,
  btn1Type,
  btn2Type,
  only
}) => {
  return (
    <DialogWrapper open={open}>
      <DialogBox open={open}>
        <h2>{text}</h2>
        <BtnBox>
          <Button text={btn1Text} onClick={btn1Click} type={btn1Type} />
          {only?null:<Button text={btn2Text} onClick={btn2Click} type={btn2Type} />}
        </BtnBox>
      </DialogBox>
      <DialogBg />
    </DialogWrapper>
  );
};

export default Dialog;
