import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import TwitterFeed from "./TwitterFeed";

import './App.css';

class App extends React.Component {

render() {
    return (
      <div className="App">
        <p>Bens App New Title</p>
        <TwitterFeed/>
        </div>
    );
  }
}

export default App;