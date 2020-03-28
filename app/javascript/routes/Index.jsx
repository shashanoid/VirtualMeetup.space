import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Event from "../components/Event";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />

      {/* Event paths */}
      <Route path="/event/create_event" exact component={Event} />
    </Switch>
  </Router>
);
