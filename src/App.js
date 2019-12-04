import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import LandingPage from './views/LandingPage';
import EventListPage from './views/EventListPage';
import Header from '../src/components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route exact path="/eventlist/" component={EventListPage} />
      </Switch>
    </div>
  );
}

export default App;
