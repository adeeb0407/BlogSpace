import React, { createContext, useState, useContext } from "react";
import "./styles/main.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import WriteBlog from "./WriteBlog";
import { Publishblog } from "./Publishblog";
import { Context } from "./Context.js";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthContext} from "./Auth";
import PrivateRoute from "./PrivateRoute";


function Main() {

  const { navShow } = useContext(AuthContext);
  
  return (
    <div>
      <Router>
          <Navbar />
          <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
            <Route exact path="/writeblog">
            {navShow ? <WriteBlog /> : <Redirect to={"/"} />}
            </Route>
            <Route exact path="/publishblog">
              {navShow ? <Publishblog /> : <Redirect to={"/"} />}
            </Route>
          </Switch>
          <Footer />
      </Router>
    </div>
  );
}

export default Main;
