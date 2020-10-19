import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Bounties from "./pages/Bounties";
import Header from './pages/Header'

function App() {
  return (
    <Router>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Bounties} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
