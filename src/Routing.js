import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home"
import Cats from "./components/Cats"
import Form from "./components/Form"


function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cats" component={Cats} />
        <Route path="/form" component={Form} />
      </Switch>
    </Router>
  );
}
export default Routing;
