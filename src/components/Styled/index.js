import React from "react";
import styled, { css, keyframes } from "styled-components";
import { cardLibrary, types } from "../../config";
import scroll from "../../assets/images/scroll.png";

export const cardWidth = 130;
export function cardHeight(width = cardWidth) {
  return width * 1.454545455;
}

export const Container = styled.div`
  ${props => `
    margin: ${props.margin || ""};
    width: ${props.width || ""};
    max-width: ${props.maxWidth || ""};
    height: ${props.height || ""};
    position: relative;
    grid-column: 1 / -1;
    ${props.scale && scale}
  `}
`;

export const FieldContainer = styled.div`
  ${props => `
    margin: ${props.margin || ""};
    width: ${props.width || ""};
    max-width: ${props.maxWidth || ""};
    height: ${props.height || ""};
    position: relative;
    grid-column: 1 / -1;
    ${props.scale && scale}
  `}
`;

const scale = `
  @media (min-width: 50px) and (max-width: 199px){
    transform: scale(0.4);
  };

  @media (min-width: 200px) and (max-width: 249px){
    transform: scale(0.5);
  };

  @media (min-width: 250px) and (max-width: 299px){
    transform: scale(0.6);
  };

  @media (min-width: 300px) and (max-width: 349px){
    transform: scale(0.7);
  };


  @media (min-width: 350px) and (max-width: 399px){
    transform: scale(0.8);
  };
  
  @media (min-width: 400px) and (max-width: 488px){
    transform: scale(0.9);
  };
`;

export const Grid = styled.div`
  ${props => `
      grid-row: ${props.gridRow || ""};
      grid-column: ${props.gridColumn || ""};
      grid-template-columns: ${props.gridTemplateColumns || "1fr"};
      grid-template-rows: ${props.gridTemplateRows || "1fr"};
      grid-gap: ${props.gap || 0}px;
      min-width: ${props.minWidth || ""};
      max-width: ${props.maxWidth || ""};
      width: ${props.width || ""};
      height: ${props.height || ""};
      max-height: ${props.maxHeight || ""};
      margin: ${props.margin || ""};
      display: grid;
      grid-template-areas: "overlap";
      position: ${props.position || ""};
      ${props.scale && scale}
      `}
`;

export const Box = styled.div`
  ${props => `
    width: ${props.width || `${cardWidth}px`};
    height: ${cardHeight()}px;
    position: ${props.position || "relative"};
    margin-left: auto;
    margin-right: auto;
    justify-items: ${props.justifyItems || ""};
    align-items: ${props.alignItems || ""};
  `}
  top: 50%;
  transform: translateY(-50%);
`;

export const Cell = styled.span`
  ${props => `
    position: relative;
    width: 100%;
    grid-column: ${props.gridColumn || ""};
    grid-row: ${props.gridRow || ""};
    width: 100%;
    height: 100%;
    padding-left: ${props.paddingLeft || ""};
    padding-right: ${props.paddingRight || ""};
    ${props.scale && scale}
  `}
`;

export const FieldBox = styled.div`
  ${props => `
    width: ${props.width || `${cardWidth}px`};
    height: ${cardHeight()}px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    ${props.scale && scale}
  `}
`;

export const CardField = styled.div`
  ${props => `
    margin-left: ${props.marginLeft || ""};
    margin-right: ${props.marginRight || ""};
    position: relative;
    border-radius: 4px;
    background: rgba(255, 255, 255, ${props.opacity || "0.25"});
    width: ${cardWidth}px;
    height: ${cardHeight()}px;
    float: ${props.float || ""};
  `}
`;

export const Gap = styled.div`
  ${props => `
    width: ${props.width || "1rem"};
    display: inline-block;
  `}
`;

// (Cards)---------------------------------------------------------------------------

export const Card = styled.div`
  ${props => `
      background: ${props.color};
      transform: ${props.transform || ""};
      transform-origin: ${props.transformOrigin || "bottom"};
      z-index: ${props.zIndex || ""};
      justify-self: center;
      position: absolute;
      border-radius: 4px;
      box-shadow: ${props.boxShadow || "0 2px 6px rgba(0, 0, 0, 0.5)"};
      transform-origin: bottom;
      transition: 0.5s;
      opacity: ${props.opacity || 1}
      width: ${cardWidth}px;
      height: ${cardHeight()}px;
      cursor: pointer;
      outline: none;
      display: grid;
      grid-template-rows: 30% 50% 20%;
      grid-template-columns: 1fr;
      grid-template-areas:
        "title"
        "image"
        "text";
      ${props.selected && "border: 2px solid white;"}
      `}
`;

export const Title = styled.div`
  position: relative;
  font-size: 1.1rem;
  font-weight: bold;
  grid-area: title;
  text-align: center;
  color: white;
  display: inline-block;
  align-self: center;
`;

export const Image = styled.img`
  ${props => `
    grid-area: image;
    text-align: center;
    max-width: 100%;
    max-height: 100%;
    justify-self: center;
    filter: drop-shadow(0 0 16px rgba(0, 0, 0, 0.25));
  `}
`;

export const Text = styled.div`
  color: white;
  line-height: 40px;
  grid-area: text;
  text-align: left;
  padding-left: 1rem;
  font-size: 0.8rem;
`;

// HELPERS ------
export const getColor = type => {
  switch (type) {
    case types.MAGIC:
      return "#3434fa";
    case types.MELEE:
      return "#ff6060";
    default:
      return "green";
  }
};

export const getCardData = card => {
  let data = cardLibrary[card];
  let title = data.name;
  let text = `+${data.power} Power`;
  let image = require(`../../assets/images/cards/${data.name}.png`);
  let color = getColor(data.type);
  return {
    title,
    text,
    image,
    color
  };
};

export const generateCard = (card, props) => {
  let { title, text, image, color } = getCardData(card);
  return (
    <Card {...props} color={color}>
      <Title>
        <span>{title}</span>
      </Title>
      <Image src={image} draggable="false" />
      <Text>{text}</Text>
    </Card>
  );
};

export const generateHiddenCard = props => {
  return (
    <Card {...props} imageRowHeight="50%" color={"#856046"}>
      <Image
        src={require(`../../assets/images/chest.png`)}
        style={{ opacity: 0.6 }}
      />
    </Card>
  );
};

export const generateDeck = deck => {
  let cards = [];
  for (let i = 0; i < deck; i++) {
    cards.push(
      generateHiddenCard({
        key: "deck" + i,
        transform: `translate(${i * 0.4}px, ${i * -0.5}px)`,
        boxShadow: "1px 4px 0px 2px rgba(0, 0, 0, 0.04)",
        zIndex: "2"
      })
    );
  }
  return cards;
};

// export const mediaQueryTransformCard = {
//   small: "scale(0.5)",
//   medium: "scale(0.8)",
//   large: "scale(1)" // translateY(24px)
// };

// export const mediaQueryTransformDeck = {
//   small: "scale(0.5)",
//   medium: "scale(0.8)",
//   large: "scale(1)"
// };

export const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url(${scroll});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  filter: drop-shadow(0 0 36px rgba(0, 0, 0, 0.25));
`;

export const AbsBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 50%;
  ${scale}
  text-align: center;
`;

export const ActionButton = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  padding: 4px 8px;
  background: #a19582;
  color: white;
  font-family: inherit; 
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.25);
`;

const flash = keyframes`
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

export const Message = styled.div`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: white;
  width: 100%;
  max-width: 720px;
  z-index: 100;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: 1.4s ${flash} linear infinite;
`;

