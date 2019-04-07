import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../HomePage";
import NotFound from "../Errors/NotFound";
import Multiplayer from "../../containers/Multiplayer";
import SinglePlayer from "../../containers/SinglePlayer";

const routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />} />
    <Route exact path="/sp" component={SinglePlayer} />
    {/* <Route exact path="/mp" component={Multiplayer} /> */}
    <Route exact path="/mp" render={() => <p>Multiplayer is Coming Soon</p>} />
    <Route exact path="/howtoplay" render={() => <p>How to Play is Coming Soon</p>} />
    <Route exact path="/updates" render={() => <p>Updates is Coming Soon</p>} />
    <Route component={NotFound} />
  </Switch>
);

export default routes;
