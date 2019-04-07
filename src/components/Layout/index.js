import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import './Layout.scss'

const layout = props => {
  return (
    <div className="container">
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </div>
  );
};

export default layout;
