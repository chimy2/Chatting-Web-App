import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Main from "./components/Main";
import Navigation from './components/Navigation';
import SideBarFriend from './components/SideBarFriend';
import SideBarTalk from './components/SideBarTalk';
import SideBarCalendar from './components/SideBarCalendar';
import SideBarNote from './components/SideBarNote';
import SideBarDot from './components/SideBarDot';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      data: {
        id: '아이디',
        password: '1234'
      }
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(newData => this.setState({data: newData}));
  }

  render() {
    return (
      <div className="App">
        {
          this.state.login ?
            <main>
              <Navigation/>
              <Switch>
                <Route path="/friend" component={SideBarFriend}/>
                <Route path="/talk" component={SideBarTalk}/>
                <Route path="/calendar" component={SideBarCalendar}/>
                <Route path="/note" component={SideBarNote}/>
                <Route path="/dot" component={SideBarDot}/>
              </Switch>
            </main> :
            <Main/>
        }
        <Footer login={this.state.login}/>
      </div>
    );
  }
}

export default App;
