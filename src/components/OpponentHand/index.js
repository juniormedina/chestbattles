import React from "react";
import { Container, Box, generateHiddenCard, cardWidth } from "../Styled";

const opponentHand = props => {
  let cards = [];
  // Computes rotation offset
  let rotatePoints = props.hand - 1; // 0
    let rotateOffset, rotateOffsetTotal;
    let rotateOffsetTotalCalc = rotatePoints * 20;
    rotateOffsetTotal = rotateOffsetTotalCalc > 150? 150 : rotatePoints*20;
    rotateOffset = rotateOffsetTotal / rotatePoints;
    let rotateStartingPoint = rotateOffsetTotal / 2 * -1;

  // Computes x offset
  let xOffset = cardWidth / 14;//6;
  let xOffsetPoints = props.hand - 1;
  let xOffsetTotal = xOffsetPoints * xOffset;
  let xOffsetStartingPoint;
  xOffsetStartingPoint = (xOffsetTotal / 2) * -1;

  // Generates cards
  for (let index = 0; index < props.hand; index++) {
    cards.push(
      generateHiddenCard({
        key: index,
        transform: `
          translateX(${(xOffsetStartingPoint + xOffset * index)}px)
          rotate(${rotateStartingPoint + rotateOffset * index}deg)`
      })
    );
  }

  return <Container scale="true"><Box>{cards}</Box></Container>;
};

export default opponentHand;
