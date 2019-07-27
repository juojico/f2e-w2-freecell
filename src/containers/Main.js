import React from "react";
import styled from "styled-components";
import Cards from "../components/Cards";
import NavTop from "../components/NavTop";
import CardBox from "../components/CardBox";
import Controller from "../components/Controller";
import Dialog from "../components/Dialog";
import StartContainer from "./StartContainer";
import WinContainer from "./WinContainer";

const POKER = [];
for (let n = 1; n <= 13; n++) {
  for (let t = 1; t <= 4; t++) {
    POKER.push({
      type: t,
      number: n
    });
  }
}

const EMPTY_All = JSON.stringify({
  storage: [[], [], [], []],
  finish: [[], [], [], []],
  table: [[], [], [], [], [], [], [], []]
});

let stepsHistory = [];

const MainContainer = styled.div`
  position: absolute;
  width: ${({ windowWidth }) => (windowWidth < 1280 ? "1280px" : "100%")};
  height: ${({ windowWidth }) => (windowWidth < 1280 ? "800px" : "100%")};
  min-width: 1280px;
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform-origin: top left;
  transform: scale(
    ${({ windowWidth }) => (windowWidth < 1280 ? windowWidth / 1280 : 1)}
  );
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
  align-items: flex-start;
  margin: 0 auto;
  margin-top: 40px;
`;

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 1280,
      difficult: 1,
      time: 0,
      move: 0,
      undoUsed: 0,
      isdialogOpen: false,
      isStartPage: true,
      isWin: false,
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
      originPoker: POKER,
      ...JSON.parse(EMPTY_All),
      hint: []
    };
  }

  targetBox = {};
  originBox = {};
  pickCard = {};
  pickCardsList = [];
  pickCardIndex = "";

  componentDidMount() {
    this.reSizeWindow();
    const gameW = window.innerWidth;
    this.setState({ windowWidth: gameW });
  }

  reSizeWindow() {
    window.onresize = () => {
      const gameW = window.innerWidth;
      this.setState({ windowWidth: gameW });
    };
  }

  setDifficult(num) {
    this.setState({ difficult: num });
  }

  shuffle() {
    const newPoker = POKER.slice().sort(
      () => this.state.difficult * 0.1 + 0.2 - Math.random()
    );
    const onStartCards = JSON.parse(EMPTY_All);
    newPoker.map((item, index) => onStartCards.table[index % 8].push(item));
    stepsHistory = [JSON.stringify(onStartCards)];
    setTimeout(() => {
      this.setState({ ...onStartCards });
    }, 500);
    console.log(
      "TCL: Main -> shuffle -> onStartCards",
      onStartCards,
      stepsHistory
    );
  }

  winTheGame() {
    const isWin = this.state.finish.every(item => item.length > 12);
    if (isWin) {
      this.pause();
      const local = localStorage.freecellBest;
      const setLocal = () =>
        localStorage.setItem(
          "freecellBest",
          JSON.stringify({
            time: this.state.time,
            move: this.state.move
          })
        );
      if (!local) {
        setLocal();
      } else if (JSON.parse(local).time > this.state.time) {
        setLocal();
      }

      this.setState({ isWin: true });
    }
  }

  // 遊戲狀態
  onEnter() {
    this.play();
    this.shuffle();
    this.setState({
      isStartPage: false
    });
  }

  play() {
    const intervalId = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);
    this.setState({ intervalId });
  }

  pause() {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: "" });
  }

  backToGame() {
    this.play();
    this.setState({
      isdialogOpen: false
    });
  }

  backToStart() {
    this.pause();
    this.setState({
      time: 0,
      move: 0,
      undoUsed: 0,
      isdialogOpen: false,
      isStartPage: true,
      isWin: false
    });
  }

  restartGame() {
    this.play();
    this.setState({
      time: 0,
      move: 0,
      undoUsed: 0,
      isdialogOpen: false,
      isWin: false,
      ...JSON.parse(stepsHistory[0])
    });
  }

  newGame() {
    this.play();
    this.shuffle();
    this.setState({
      time: 0,
      move: 0,
      undoUsed: 0,
      isdialogOpen: false,
      isWin: false
    });
  }

  // 下方按鈕操作
  onStop() {
    this.pause();
    this.setState({
      dialog: {
        text: "是否放棄本局？",
        btn1Text: "取消",
        btn2Text: "確定",
        btn1Click: () => this.backToGame(),
        btn2Click: () => this.backToStart(),
        only: false
      },
      isdialogOpen: true
    });
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
  }

  onUndo() {
    const nowStep = this.state.move;
    if (nowStep) {
      this.setState({
        ...JSON.parse(stepsHistory[nowStep - 1]),
        move: nowStep - 1,
        undoUsed: this.state.undoUsed + 1
      });
      stepsHistory.splice(-1);
    }
  }

  onRestart() {
    this.pause();
    this.setState({
      dialog: {
        text: "是否重新本局？",
        btn1Text: "取消",
        btn2Text: "確定",
        btn1Click: () => this.backToGame(),
        btn2Click: () => this.restartGame(),
        only: false
      },
      isdialogOpen: true
    });
    stepsHistory.splice(1);
  }

  onTips() {
    const canMoveCards = JSON.parse(JSON.stringify(this.state.table)).map(
      item => item.pop()
    );
    console.log("onTips", canMoveCards);

    const isMoveAble = [];
    canMoveCards.forEach((item, index, array) => {
      const isSameType = (a, b) =>
        (a > 2 ? true : false) === (b > 2 ? true : false);

      array.map((card, cardIndex) => {
        if (
          card.number - 1 === item.number &&
          !isSameType(card.type, item.type)
        ) {
          return isMoveAble.push([index, cardIndex]);
        } else {
          return false;
        }
      });
    });
    console.log("TCL: Main -> onTips -> isMoveAble", isMoveAble);
    if (isMoveAble.length > 0) {
      isMoveAble.forEach((item, index) => {
        setTimeout(() => {
          this.setState({ hint: item });
          console.log("TCL: Main -> onTips -> hint", this.state.hint);
        }, 1000 * index);
        setTimeout(() => {
          this.setState({ hint: "" });
        }, 1000 * index + 1000);
      });
    }
  }

  // 移動相關
  updateCardBox(key, value, key2, value2) {
    let data = {};
    data[key] = value;
    let data2 = {};
    data2[key2] = value2;
    const stepNowCards = JSON.parse(stepsHistory[this.state.move]);
    stepNowCards[key] = value;
    stepNowCards[key2] = value2;
    stepsHistory.push(JSON.stringify(stepNowCards));
    this.winTheGame();
    this.setState({ data, data2, move: this.state.move + 1 });
    console.log(stepsHistory);
  }

  handleDoubleClickItem(type, number, name, index, cardIndex) {
    this.pickCard = { type, number };
    this.originBox = { name, index };
    const newBoxContent = this.state["finish"];
    const setOriginBox = this.state[name];
    let newLastCard = { type: type, number: 0 };
    if (newBoxContent[type - 1].length > 0) {
      newLastCard = new Array(...newBoxContent[type - 1]).pop();
    }
    if (
      newLastCard.number === number - 1 &&
      cardIndex === setOriginBox[index].length - 1
    ) {
      newBoxContent[type - 1] = [...newBoxContent[type - 1], this.pickCard];
      setOriginBox[index] = setOriginBox[index].filter(
        item =>
          item.type !== this.pickCard.type ||
          item.number !== this.pickCard.number
      );
      this.updateCardBox(name, setOriginBox, "finish", newBoxContent);
    }
  }

  handleDragStart(type, number, name, index, cardIndex) {
    this.pickCard = { type, number };
    this.originBox = { name, index };
    const thisBoxCards = this.state.table[index];
    const lastIndex = thisBoxCards.length - 1;
    this.pickCardsList = [];
    this.pickCardIndex = cardIndex;

    if (name === "table" && cardIndex !== lastIndex) {
      const afterCards = thisBoxCards.slice(cardIndex);
      console.log("TCL: Main -> handleDragStart -> afterCards", afterCards);

      const isConnect = afterCards.slice(1).every((item, index) => {
        const lastCard = thisBoxCards[cardIndex + index];
        const isSameType =
          (item.type > 2 ? true : false) === (lastCard.type > 2 ? true : false);
        return item.number === lastCard.number - 1 && !isSameType;
      });
      console.log("TCL: Main -> handleDragStart -> isConnect", isConnect);

      if (isConnect) {
        this.pickCardsList = [...afterCards];
      } else {
        this.pickCard = "";
        this.pickCardsList = [];
        this.pickCardIndex = "";
      }
    }
  }

  handleDragOver(e, name, index) {
    e.preventDefault();
    this.targetBox = { name, index };
  }

  // 移動判斷
  handleDrop(e) {
    e.preventDefault();

    const newBoxContent = this.state[this.targetBox.name];
    const setOriginBox = this.state[this.originBox.name];
    console.log("TCL: Main -> handleDrop -> setOriginBox", setOriginBox);
    switch (this.targetBox.name) {
      case "storage":
        if (
          newBoxContent[this.targetBox.index].length < 1 &&
          this.pickCardsList.length < 1 &&
          this.pickCard
        ) {
          newBoxContent[this.targetBox.index] = [this.pickCard];
          setOriginBox[this.originBox.index] = setOriginBox[
            this.originBox.index
          ].filter(
            item =>
              item.type !== this.pickCard.type ||
              item.number !== this.pickCard.number
          );
          this.updateCardBox(
            this.originBox.name,
            setOriginBox,
            this.targetBox.name,
            newBoxContent
          );
        }
        this.pickCardsList = [];
        break;

      case "finish":
        let newLastCard = { type: this.targetBox.index + 1, number: 0 };
        if (newBoxContent[this.targetBox.index].length > 0) {
          newLastCard = new Array(...newBoxContent[this.targetBox.index]).pop();
        }
        if (
          newLastCard.type === this.pickCard.type &&
          newLastCard.number === this.pickCard.number - 1 &&
          this.pickCardsList < 1 &&
          this.pickCard
        ) {
          newBoxContent[this.targetBox.index] = [
            ...newBoxContent[this.targetBox.index],
            this.pickCard
          ];
          setOriginBox[this.originBox.index] = setOriginBox[
            this.originBox.index
          ].filter(
            item =>
              item.type !== this.pickCard.type ||
              item.number !== this.pickCard.number
          );
          this.updateCardBox(
            this.originBox.name,
            setOriginBox,
            this.targetBox.name,
            newBoxContent
          );
        }
        this.pickCardsList = [];
        break;

      case "table":
        if (
          this.originBox.name === "table" &&
          this.targetBox.index === this.originBox.index
        ) {
          console.log(
            "TCL: Main -> handleDrop -> 目標與來源相同",
            this.originBox,
            this.targetBox
          );
          break;
        }
        if (!this.pickCard) {
          break;
        }

        let newTableLastCard = { type: 1, number: 0 };
        if (newBoxContent[this.targetBox.index].length > 0) {
          newTableLastCard = new Array(
            ...newBoxContent[this.targetBox.index]
          ).pop();
        }
        const newLastCardColor = newTableLastCard.type > 2 ? "red" : "black";
        const pickCardColor = this.pickCard.type > 2 ? "red" : "black";
        if (
          newTableLastCard.number === 0 ||
          (newLastCardColor !== pickCardColor &&
            newTableLastCard.number - 1 === this.pickCard.number)
        ) {
          newBoxContent[this.targetBox.index] = [
            ...newBoxContent[this.targetBox.index],
            this.pickCard,
            ...this.pickCardsList.slice(1)
          ];

          setOriginBox[this.originBox.index].splice(
            this.pickCardIndex,
            setOriginBox[this.originBox.index].length - this.pickCardIndex
          );

          this.updateCardBox(
            this.originBox.name,
            setOriginBox,
            this.targetBox.name,
            newBoxContent
          );
        }
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <MainContainer windowWidth={this.state.windowWidth}>
        <Dialog open={this.state.isdialogOpen} data={this.state.dialog} />
        <StartContainer
          open={this.state.isStartPage}
          onClick={() => this.onEnter()}
          setDifficult={num => this.setDifficult(num)}
          nowDifficult={this.state.difficult}
        />
        <WinContainer
          open={this.state.isWin}
          time={this.state.time}
          move={this.state.move}
          undoUsed={this.state.undoUsed}
          onClick1={() => this.newGame()}
          onClick2={() => this.backToStart()}
        />
        <NavTop time={this.state.time} move={this.state.move} />
        <CardsTable blur={this.state.isdialogOpen || this.state.isWin}>
          <CardArea>
            {this.state.storage.map((item, index) => (
              <CardBox
                key={`storage${index}`}
                type="storage"
                onDragOver={e => this.handleDragOver(e, "storage", index)}
                onDrop={e => this.handleDrop(e)}
              >
                {item.map((cards, cardIndex) => (
                  <Cards
                    type={cards.type}
                    number={cards.number}
                    key={cards.type + "x" + cards.number}
                    onDoubleClick={() =>
                      this.handleDoubleClickItem(
                        cards.type,
                        cards.number,
                        "storage",
                        index,
                        cardIndex
                      )
                    }
                    onDragStart={() =>
                      this.handleDragStart(
                        cards.type,
                        cards.number,
                        "storage",
                        index,
                        cardIndex
                      )
                    }
                  />
                ))}
              </CardBox>
            ))}
            {this.state.finish.map((item, index) => (
              <CardBox
                key={`finish${index}`}
                type="finish"
                cardType={index + 1}
                onDragOver={e => this.handleDragOver(e, "finish", index)}
                onDrop={e => this.handleDrop(e)}
              >
                {item.map((cards, cardIndex) => (
                  <Cards
                    type={cards.type}
                    number={cards.number}
                    key={cards.type + "x" + cards.number}
                    isFinish
                    onDragStart={() =>
                      this.handleDragStart(
                        cards.type,
                        cards.number,
                        "finish",
                        index,
                        cardIndex
                      )
                    }
                  />
                ))}
              </CardBox>
            ))}
          </CardArea>
          <CardArea>
            {this.state.table.map((item, index) => (
              <CardBox
                key={`table${index}`}
                type="table"
                hint={
                  index === this.state.hint[0] || index === this.state.hint[1]
                }
                onDragOver={e => this.handleDragOver(e, "table", index)}
                onDrop={e => this.handleDrop(e)}
              >
                {item.map((cards, cardIndex) => (
                  <Cards
                    type={cards.type}
                    number={cards.number}
                    key={cards.type + "x" + cards.number}
                    delay={index}
                    onDoubleClick={() =>
                      this.handleDoubleClickItem(
                        cards.type,
                        cards.number,
                        "table",
                        index,
                        cardIndex
                      )
                    }
                    onDragStart={() =>
                      this.handleDragStart(
                        cards.type,
                        cards.number,
                        "table",
                        index,
                        cardIndex
                      )
                    }
                  />
                ))}
              </CardBox>
            ))}
          </CardArea>
        </CardsTable>
        <Controller
          hidden={
            this.state.isdialogOpen ||
            this.state.isWin ||
            this.state.isStartPage
          }
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
