import React, { Component } from "react";
import {
  Container,
  Box,
  generateCard,
  cardWidth,
  cardHeight,
  AbsBox,
  ActionButton
} from "../Styled";

class Hand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: null
    };
  }

  render() {
    // Computes rotation offset
    let rotatePoints = this.props.hand.length - 1; // 0
    let rotateOffset, rotateOffsetTotal;
    let rotateOffsetTotalCalc = rotatePoints * 20;
    rotateOffsetTotal = rotateOffsetTotalCalc > 150 ? 150 : rotatePoints * 20;
    rotateOffset = rotateOffsetTotal / rotatePoints;
    let rotateStartingPoint = (rotateOffsetTotal / 2) * -1;

    // Computes x offset
    let xOffset = cardWidth / 14; //6;
    let xOffsetPoints = this.props.hand.length - 1;
    let xOffsetTotal = xOffsetPoints * xOffset;
    let xOffsetStartingPoint;
    xOffsetStartingPoint = (xOffsetTotal / 2) * -1;

    const cards = this.props.hand.map((card, index) => {
      let ref = React.createRef();
      return generateCard(card, {
        key: index,
        ref,
        selected: this.props.discardCards.includes(index),
        onMouseEnter: () => this.onClickHandler(ref, index),
        onMouseLeave: () => this.onBlurHandler(ref),
        onClick: () => this.onClickHandler(ref, index),
        onBlur: () => this.onBlurHandler(ref),
        tabIndex: "-1",
        transform: `
              translate(${xOffsetStartingPoint +
                xOffset * index}px, ${cardHeight() / -6}px)
              rotate(${rotateStartingPoint + rotateOffset * index}deg)`
      });
    });
    return (
      <Container scale="true">
        <Box>
          {this.props.button !== null ? (
            <AbsBox>
              <ActionButton onClick={this.props.button.onClick}>
                {this.props.button.text}
              </ActionButton>
            </AbsBox>
          ) : null}
          {cards}
        </Box>
      </Container>
    );
  }

  onClickHandler = (ref, index) => {
    let node = ref.current;
    if (this.state.node !== null) {
      if (node === this.state.node) {
        // Card was selected; Dispatch
        this.props.onEvent(index);
        // Clears node
        this.setState({ node: null });
        return;
      } else {
        // Restores & clears node
        this.restoreNode(node);
      }
    }
    // Modifies & stores node
    this.modifyNode(node);
  };

  onBlurHandler = ref => {
    let node = ref.current;
    // Restores & clears node
    this.restoreNode(node);
  };

  modifyNode = node => {
    node.style.zIndex = "1";
    node.style.boxShadow = "0 10px 16px rgba(0, 0, 0, 0.5)";
    node.focus();
    this.setState({ node });
  };

  restoreNode = node => {
    node.style.zIndex = "";
    node.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.5)";
    this.setState({ node: null });
  };
}
export default Hand;

// TODO: fix blur effect: node.focus()
