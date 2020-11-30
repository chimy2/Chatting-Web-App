import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Header from './components/Header'
import SideBar from './components/SideBar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <main>
        <Header/>
        <SideBar/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
