import React, { Component } from 'react';
import TwitterFeed from "./TwitterFeed";
import CTASchedule from "./CTASchedule";
import Weather from "./Weather";
import Clock from "./Clock"
import StocksPrice from "./Stocks"
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ExpandIcon from "./images/expand.svg"
import GithubIcon from "./images/GitHub_Logo.png"

import './css/index.css'
import './css/App.css';

function App() {

 var handle = useFullScreenHandle();

    return (
      <FullScreen handle={handle}>
      <html style={{height: "100vh"}}>
        <head>
        <link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'/>
        </head>
        <body className="dash-container">
          
          <div className="column-small">
            <div className="tile" style={{height: "20%"}}>
              <div className="tile-title">
                Clock
              </div>
              <div className="tile-body">
                <Clock/>
              </div>
            </div>
            <div className="tile" style={{height: "78%"}}>
              <div className="tile-title">
                Twitter
              </div>
              <div className="tile-body">
                <TwitterFeed/>
              </div>
            </div>
          </div>

          <div className="column-medium">
            <div className="tile" style={{height: "49%"}}>
              <div className="tile-title">
                Weather
              </div>
              <div className="tile-body">
                <Weather/>
              </div>
            </div>
            <div className="tile" style={{height: "49%"}}>
              <div className="tile-title">
                Stocks
              </div>
              <div className="tile-body">
                <StocksPrice/>
              </div>
            </div>
          </div>

          <div className="column-large">
            <div className="tile" style={{height: "99%"}}>
              <div className="tile-title">
                Train Schedule
              </div>
              <div className="tile-body">
                <CTASchedule/>
              </div>
              <div className="full-screen-button">
                <button onClick={handle.enter}>
                  <img src={ExpandIcon} style={{"width": "40px"}}/>
                </button>
              </div>
              <div className="github-link">
                  <img src={GithubIcon} style={{"width": "80px"}}/>
              </div>
            </div>
          </div>

        </body>
      </html>
      </FullScreen>
    );
  }

export default App;