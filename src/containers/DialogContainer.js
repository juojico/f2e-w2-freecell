import React from "react";
import Dialog from "../components/Dialog";

const data1 = {
  text: "是否放棄本局？",
  btn1Text: "取消",
  btn2Text: "確定",
  only: false
};

const data2 = {
  text: "時間暫停中",
  btn1Text: "回到遊戲",
  only: true
};

const data3 = {
  text: "是否重新本局？",
  btn1Text: "取消",
  btn2Text: "確定",
  only: false
};

const DialogContainer = ({
  open,
  dialogType,
  backToGame,
  backToStart,
  restartGame
}) => {
  return (
    <>
      {(() => {
        switch (dialogType) {
          case 1:
            return (
              <Dialog
                open={open}
                data={data1}
                btn1Click={backToGame}
                btn2Click={backToStart}
              />
            );
          case 2:
            return <Dialog open={open} data={data2} btn1Click={backToGame} />;
          case 3:
            return (
              <Dialog
                open={open}
                data={data3}
                btn1Click={backToGame}
                btn2Click={restartGame}
              />
            );
          default:
            return null;
        }
      })()}
    </>
  );
};

export default DialogContainer;
