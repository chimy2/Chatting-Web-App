import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { Cookies, useCookies }  from 'react-cookie';

import Main from "./components/Main";
import Navigation from './components/Navigation';
import SideBarFriend from './components/SideBarFriend';
import SideBarTalk from './components/SideBarTalk';
import SideBarCalendar from './components/SideBarCalendar';
import SideBarNote from './components/SideBarNote';
import SideBarDot from './components/SideBarDot';
import Footer from './components/Footer';

function App(props) {
  let history = useHistory();
  const [login, setLogin] = useState(false);
  const { cookies, setCookie } = useCookies('id');
  
  // useEffect(() => {
  //   console.log(cookies);
  //   if(cookies !== undefined && cookies !== null){
  //     setLogin(true);
  //     console.log('true');
  //   }else {
  //     setLogin(false);
  //     console.log('false');
  //   }
  // }, [cookies]);

  useEffect(() => {
    history.push('./');
  }, [login]);

  return (
    <div className="App">
      {
        login ?
          <main>
            <Navigation/>
            <Switch>
              <Route exact path="/" component={SideBarFriend}/>
              <Route path="/talk" component={SideBarTalk}/>
              <Route path="/calendar" component={SideBarCalendar}/>
              <Route path="/note" component={SideBarNote}/>
              <Route path="/dot" component={SideBarDot}/>
            </Switch>
          </main> :
          <Main setLogin={setLogin}/>
      }
      <Footer login={login}/>
    </div>
  );
}

export default App;
