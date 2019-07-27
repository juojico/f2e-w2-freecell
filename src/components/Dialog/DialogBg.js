import React from "react";
import styled from "styled-components";
import Cloud from "../../slice_img/ui/img_cloud.svg";

const DialogBg = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(${Cloud});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
  pointer-events: none;
  filter: blur(6px);
  z-index: 40;
`;

const Dialog = () => {
  return <DialogBg />;
};

export default Dialog;
