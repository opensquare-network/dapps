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
import ToastContainer from "./ToastContainer";
import BountyDetail from '@pages/BountyDetail';
import Councilor from '@pages/Councilor';
import CouncilorBountyDetail from '@pages/CouncilorBountyDetail';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProperties())
  }, [dispatch])

  return (
    <Router>
      <Header />
      <ToastContainer />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Bounties} />
          <Route exact path="/fund" component={NewBounty} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/bounty/:bountyId" component={BountyDetail} />
          <Route exact path="/councilor" component={Councilor} />
          <Route exact path="/councilor/bounty/:bountyId" component={CouncilorBountyDetail} />
          <Redirect to="/" />
        </Switch>
      </Wrapper>
      <Footer />
    </Router>
  );
}

export default App;
