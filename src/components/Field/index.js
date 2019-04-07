import React, { Component } from "react";
import { Grid, CardField, generateCard, Cell, Container, Box } from "../Styled";
import { turns } from "../../config";

class Field extends Component {
  render() {
    console.log(this.props.playerCard);
    console.log(this.props.opponentCard);
    return (
      <Container width="100%" height="100%" margin="0 auto">
        <Box width="100%">
          <Grid
            maxWidth="660px"
            width="fit-content"
            gridTemplateColumns="repeat(4, minmax(20px ,1fr))"
            gridTemplateRows="1fr"
            margin="0 auto"
            scale="true"
          >
            {/* <Cell gridColumn="1 / span 1" >
              <CardField opacity="0.5" float="left"/>
            </Cell> */}

            <Cell gridColumn="2 / span 1">
              <CardField float="right" opacity="0">
                {this.props.playerCard === null
                  ? null
                  : generateCard(this.props.playerCard, {
                      zIndex: `${this.props.turn === turns.PLAYER ? 1 : 2}`
                    })}
              </CardField>
            </Cell>

            <Cell gridColumn="3 / span 1">
              <CardField float="left" opacity="0">
                {this.props.opponentCard === null
                  ? null
                  : generateCard(this.props.opponentCard, {
                      zIndex: `${this.props.turn === turns.OPPONENT ? 1 : 2}`
                    })}
              </CardField>
            </Cell>

            {/* <Cell gridColumn="4 / span 1" paddingLeft="16px">
              <CardField float="right">
                {this.props.deck < 1 ? null : generateDeck(this.props.deck)}
              </CardField>
            </Cell> */}
          </Grid>
        </Box>
      </Container>
    );
  }
}
export default Field;
