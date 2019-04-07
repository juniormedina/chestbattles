import React from "react";
import { Link } from "react-router-dom";
// import "./HomePage.scss";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 60px;
  grid-column: 3 / 11;
  align-items: center;
`;

const Heading = styled.p`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  max-width: 800px;
  margin: 32px auto;
`;

const Button = styled.div`
  text-align: center;
  ${props => `
    background: ${props.background || "#f2e796"};
  `}
  width: 240px;
  height: 60px;
  border-radius: 2px;
  margin: 16px auto;
`;

const linkStyle = {
  lineHeight: "60px",
  color: "#4f4f4f",
  fontSize: "1.5rem",
  textDecoration: "none"
};

const homePage = () => (
  <Container>
    <Heading>
      Chest Battles is a simple card game that is easy to learn and rewarding to
      master.
    </Heading>
      <Button>
        <Link to="/sp" style={linkStyle}>
          Single Player
        </Link>
      </Button>
      <Button background="#bab8a8">
        <Link to="/mp" style={linkStyle}>
          Multiplayer
        </Link>
      </Button>
  </Container>
);

export default homePage;
