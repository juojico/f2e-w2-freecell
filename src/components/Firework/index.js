import React from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as CardType1 } from "../../slice_img/cards/cardtype_1.svg";
import { ReactComponent as CardType2 } from "../../slice_img/cards/cardtype_2.svg";
import { ReactComponent as CardType3 } from "../../slice_img/cards/cardtype_3.svg";
import { ReactComponent as CardType4 } from "../../slice_img/cards/cardtype_4.svg";

const ParticleBoxeMV = keyframes`
  10% {
    margin-top: -50%;
  }
  12% {
    margin-top: -52%;
  }
  100% {
    margin-top: -20%;
  }
`;
const ParticleMV = keyframes`
  to {
    top: 50%;
    opacity: 1;
    transform: scale(1);
  }
`;

const ParticleBox = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: 500px;
  height: 500px;
  margin-top: 0%;
  transform: translate(-50%);
  animation: ${ParticleBoxeMV} 3s linear infinite;
  z-index: 50;
`;

const Particle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 150;
  &::before,
  &::after {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    top: 100%;
    left: 50%;
    background: yellow;
    border-radius: 100%;
    box-shadow: 0 0 6px yellow, 0 0 20px yellow;
    opacity: 0;
    transform: scale(0.2);
    animation: ${ParticleMV} 3s 0.3s ease-in reverse infinite;
  }
  &::after {
    top: 0;
    animation: ${ParticleMV} 3s 0.3s ease-in reverse infinite;
  }
`;

class Firework extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.forceUpdate();
    }, 3000);
  }
  componentDidUpdate() {
    setTimeout(() => {
      this.forceUpdate();
    }, 3000);
    console.log("updata", this.props.open);
  }

  random = num => {
    return Math.random() * num;
  };

  makeParticle = num => {
    const particles = [];
    for (let i = 0; i < num; i++) {
      particles.push(
        <Particle
          key={"part" + i}
          style={{
            transform: `scale(${this.random(0.5) + 0.5}) rotate(${this.random(
              180
            )}deg)`
          }}
        />
      );
    }
    return particles;
  };

  makeParticleBox = num => {
    return (
      <React.Fragment>
        <ParticleBox top={"90%"} left={"20%"}>
          {this.makeParticle(num)}
        </ParticleBox>
        <ParticleBox top={"90%"} left={"80%"}>
          {this.makeParticle(num)}
        </ParticleBox>
      </React.Fragment>
    );
  };

  render() {
    return <React.Fragment>{this.makeParticleBox(7)}</React.Fragment>;
  }
}

export default Firework;
