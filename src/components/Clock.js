import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  tick() {
    this.setState(state => ({
      time: new Date()
    }))
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="clock-container">
      <p className="App-clock" style={{"font-size": "50px", "color": "red", "text-align": "center"}}>
        {this.state.time.toLocaleTimeString([], { hour12: false })}
      </p>
      </div>
    );
  }
} 

export default Clock;