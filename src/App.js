import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Navigation from './components/Navigation';
import SideBarFriend from './components/SideBarFriend';
import SideBarTalk from './components/SideBarTalk';
import SideBarCalendar from './components/SideBarCalendar';
import SideBarNote from './components/SideBarNote';
import SideBarDot from './components/SideBarDot';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <main>
        <Navigation/>
        <Switch>
          <Route path="/friend" component={SideBarFriend}/>
          <Route path="/talk" component={SideBarTalk}/>
          <Route path="/calendar" component={SideBarCalendar}/>
          <Route path="/note" component={SideBarNote}/>
          <Route path="/dot" component={SideBarDot}/>
        </Switch>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
