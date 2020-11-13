import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Bounties from "../pages/Bounties";
import Header from '../pages/Header'
import Footer from "../pages/Footer"
import { Wrapper } from "./components";
import NewBounty from "@pages/NewBounty";
import { useDispatch } from "react-redux";
import { fetchProperties } from "@store/reducers/chainSlice";
import Profile from "@pages/Profile";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProperties())
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Bounties} />
          <Route exact path="/fund" component={NewBounty} />
          <Route exact path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </Wrapper>
      <Footer />
    </Router>
  );
}

export default App;
