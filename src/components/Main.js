import React, { createContext, useState } from "react";
import "./styles/main.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";
import WriteBlog from "./WriteBlog";
import { Publishblog } from "./Publishblog";
import { Context } from "./Context.js";

function Main() {
  const [blogId, setBlogId] = useState("");
  const [blogContentFetch, setBlogContentFetch] = useState("");

  return (
    <div>
      <Router>
        <Context.Provider
         value={{ blogId: blogId, setBlogId: setBlogId, blogContentFetch: blogContentFetch, setBlogContentFetch: setBlogContentFetch }}
        >
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/writeblog">
              <WriteBlog />
            </Route>
            <Route exact path="/publishblog">
              <Publishblog />
            </Route>
          </Switch>
          <Footer />
        </Context.Provider>
      </Router>
    </div>
  );
}

export default Main;
