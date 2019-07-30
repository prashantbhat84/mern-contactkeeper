import React,{Fragment}from 'react';
import NavBar from './components/Layout/Navbar/Navbar';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';

import './App.css';

const  App=()=> {
  return (
    <Router>
      <Fragment>
        <NavBar/>
      <Switch>
              <Route exact path='/' component={Home} />
              
              <Route path='/about' component={About} />
          </Switch>

          </Fragment>
    
  
    </Router>
  );
}

export default App;
