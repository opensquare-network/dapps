import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Bounties from "../pages/Bounties";
import Header from '../pages/Header'
import { Wrapper } from "./components";

function Index() {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Bounties} />
          <Redirect to="/" />
        </Switch>
      </Wrapper>
    </Router>
  );
}

export default Index;
