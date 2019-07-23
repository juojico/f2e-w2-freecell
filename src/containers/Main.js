import React from "react";
import styled from "styled-components";
import Cards from "../components/Cards";
import NavTop from "../components/NavTop";
import CardBox from "../components/CardBox";
import Controller from "../components/Controller";

const POKER = [];
for (let t = 1; t <= 4; t++) {
  for (let n = 1; n <= 13; n++) {
    POKER.push({
      type: t,
      number: n
    });
  }
}

POKER.sort(() => 0.5 - Math.random());
console.log("TCL: POKER", POKER);

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const CardsTable = styled.div`
  position: relative;
  background: #2c2b50;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: start;
  flex-direction: column;
  overflow-x: auto;
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
      time: 0,
      step: 0,
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
  }

  onStop() {
    console.log("onStop");
  }
  onPause() {
    console.log("onPause");
  }
  onUndo() {
    console.log("onUndo");
  }
  onRestart() {
    console.log("onRestart");
  }
  onTips() {
    console.log("onTips");
  }

  render() {
    return (
      <MainContainer>
        <NavTop />
        <CardsTable>
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
