import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Event from "../components/Event";

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />

      {/* Event paths */}
      <Route exact path="/event/create_event" component={Event} />
    </Switch>
  </Router>
);
