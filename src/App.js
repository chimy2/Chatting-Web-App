import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { Cookies, useCookies }  from 'react-cookie';
import { io } from 'socket.io-client';

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
    // if(login){
      // const socket = io();
      // const socket = io("/socket.io");
      // const socket = io("/", {path: "sosososo"});
      // console.log("로그인 완료", socket.io.uri);
      // socket.emit('login', {
      //   name: 1111,
      //   id: 1111
      // });
      // console.log("로그인 완료 확인", socket, socket.connected);
      // socket.on("connection", (socket) => {
      // console.log("-------옵니까 소켓소켓");
      // console.log(socket);
      // console.log(socket.connected);
      // console.log("로그인 완료 확인 -------", socket, socket.connected);
      // });
    // }
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
