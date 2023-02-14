import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import LocationsShowPage from "./LocationsShowPage";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <div className="home-page"> 
      <Router>
        <TopBar user={currentUser} />
        <Switch>
          <Route exact path="/">
            <h5 className="home-page-motto">Live in the now</h5>
            <h1 className="home-page-name">Explorality</h1>
            <a type="button" className="home-page-button gradient-hover-effect " href="/locations">Explore Locations</a>
          </Route>
          <Route exact path="/locations" component={LocationsShowPage} />
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
        </Switch>
      </Router>
    </div>
  );
};

export default hot(App);