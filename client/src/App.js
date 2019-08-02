import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route excat path="/register" component={Register} />
                <Route excat path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
  );
}

export default App;
