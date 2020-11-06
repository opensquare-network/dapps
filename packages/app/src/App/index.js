import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Bounties from "../pages/Bounties";
import Header from '../pages/Header'
import Footer from "../pages/Footer"
import { Wrapper } from "./components";
import NewBounty from "@pages/NewBounty";

function App() {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Bounties} />
          <Route exact path="/fund" component={NewBounty} />
          <Redirect to="/" />
        </Switch>
      </Wrapper>
      <Footer />
    </Router>
  );
}

export default App;
