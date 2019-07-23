import React from "react";
import styled from "styled-components";
import Cards from "../components/Cards";
import NavTop from "../components/NavTop";
import CardBox from "../components/CardBox";
import Controller from "../components/Controller";
import Dialog from "../components/Dialog";

const POKER = [];
for (let t = 1; t <= 4; t++) {
  for (let n = 1; n <= 13; n++) {
    POKER.push({
      type: t,
      number: n
    });
  }
}

const DIFFICULT = 0.3;

POKER.sort(() => DIFFICULT - Math.random());
console.log("TCL: POKER", POKER);

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;
const CardsTable = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: start;
  flex-direction: column;
  overflow-x: auto;
  transition: 0.5s ease-in-out;
  filter: ${props => (props.blur ? "blur(6px)" : "none")};
  opacity: ${props => (props.blur ? "0.5" : "1")};
`;
const CardArea = styled.div`
  position: relative;
  min-width: 1200px;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  margin-top: 40px;
`;

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      difficult: DIFFICULT,
      time: 0,
      move: 0,
      isdialogOpen: false,
      dialog: {
        text: "",
        btn1Text: "取消",
        btn2Text: "確定",
        btn1Click: () => false,
        btn2Click: () => false,
        btn1Type: "",
        btn2Type: "",
        only: false
      },
      isPlaying: true,
      originPoker: POKER,
      storage1: [],
      storage2: [],
      storage3: [],
      storage4: [],
      finish1: [],
      finish2: [],
      finish3: [],
      finish4: [],
      table: [
        POKER.slice(0, 7),
        POKER.slice(7, 14),
        POKER.slice(14, 21),
        POKER.slice(21, 28),
        POKER.slice(28, 34),
        POKER.slice(34, 40),
        POKER.slice(40, 46),
        POKER.slice(46, 52)
      ]
    };
  }

  componentDidMount() {
    console.log(this.state);
    this.state.isPlaying ? this.play() : this.pause();
  }
  play() {
    const intervalId = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);
    this.setState({ intervalId });
  }

  pause() {
    clearInterval(this.state.intervalId);
  }

  onStop() {
    this.setState({
      dialog: {
        text: "是否放棄本局？",
        btn1Text: "取消",
        btn2Text: "確定",
        btn1Click: () => this.onCloseDialog(),
        btn2Click: () => this.onCloseDialog(),
        only: false
      },
      isdialogOpen: true
    });
    console.log("onStop");
  }
  onPause() {
    this.pause();
    this.setState({
      dialog: {
        text: "時間暫停中",
        btn1Text: "回到遊戲",
        btn1Click: () => this.backToGame(),
        only: true
      },
      isdialogOpen: true
    });
    console.log("onPause");
  }
  backToGame() {
    this.play();
    this.onCloseDialog();
  }
  onUndo() {
    console.log("onUndo");
  }
  onRestart() {
    this.setState({
      dialog: {
        text: "是否重新本局？",
        btn1Text: "取消",
        btn2Text: "確定",
        btn1Click: () => this.onCloseDialog(),
        btn2Click: () => this.onCloseDialog(),
        only: false
      },
      isdialogOpen: true
    });
    console.log("onRestart");
  }
  onTips() {
    this.setState({
      dialog: {
        text: "提示",
        btn1Text: "關閉",
        btn1Click: () => this.onCloseDialog(),
        only: true
      },
      isdialogOpen: true
    });
    console.log("onTips");
  }

  onCloseDialog() {
    this.setState({
      isdialogOpen: false
    });
    console.log("onCloseDialog");
  }

  render() {
    return (
      <MainContainer>
        <Dialog
          open={this.state.isdialogOpen}
          text={"Congratulations! You Won the Game."}
          btn1Click={() => this.onCloseDialog()}
          text={this.state.dialog.text}
          btn1Text={this.state.dialog.btn1Text}
          btn2Text={this.state.dialog.btn2Text}
          btn1Click={this.state.dialog.btn1Click}
          btn2Click={this.state.dialog.btn2Click}
          btn1Type={this.state.dialog.btn1Type}
          btn2Type={this.state.dialog.btn2Type}
          only={this.state.dialog.only}
        />
        <NavTop time={this.state.time} move={this.state.move} />
        <CardsTable blur={this.state.isdialogOpen}>
          <CardArea>
            <CardBox />
            <CardBox />
            <CardBox />
            <CardBox />
            <CardBox type='finish' cardType={1} />
            <CardBox type='finish' cardType={2} />
            <CardBox type='finish' cardType={3} />
            <CardBox type='finish' cardType={4} />
          </CardArea>
          <CardArea>
            {this.state.table.map((item, index) => (
              <CardBox key={index}>
                {item.map(cards => (
                  <Cards
                    type={cards.type}
                    number={cards.number}
                    key={cards.type + "x" + cards.number}
                  />
                ))}
              </CardBox>
            ))}
          </CardArea>
        </CardsTable>
        <Controller
          hidden={this.state.isdialogOpen}
          onStop={() => this.onStop()}
          onPause={() => this.onPause()}
          onUndo={() => this.onUndo()}
          onRestart={() => this.onRestart()}
          onTips={() => this.onTips()}
        />
      </MainContainer>
    );
  }
}

export default Main;
