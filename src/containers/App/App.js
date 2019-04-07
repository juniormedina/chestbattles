import React, { Component } from "react";
import "./App.scss";
import Routes from "../../components/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "../../components/Layout";

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    );
  }
}

export default App;
