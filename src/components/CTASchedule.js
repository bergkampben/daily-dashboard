import React from "react";
import Select from 'react-select';
var parseString = require('xml2js').parseString;

var MAX_TRAIN_RESULTS = 12;

var stationOptions = [
    { value: "40800", label: "Sedgwick" },
    { value: "41510", label: "Morgan"},
    { value: "40380", label: "Clark/Lake" },
    { value: "41400", label: "Roosevelt"},
    { value: "40530", label: "Diversey" }
]

class CTASchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrivals_list: [],
            station_id: "40380",
            is_loading: true
        }
    }

    componentDidMount() {
        this.getTrainSchedule();
        this.interval = setInterval(() => this.getTrainSchedule(), 20000)    
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getTrainSchedule = async () => {
        const response = await fetch('/api/cta-schedule?station=' + this.state.station_id);
        const body = await response.json();

        parseString(body.body, (err, result) => {
            var etaXmls = result.ctatt.eta;
            this.setState({arrivals_list: etaXmls.slice(0, MAX_TRAIN_RESULTS), is_loading: false});
            this.forceUpdate();
        });
      };

      loadingMessage = () => {
        if (this.state.is_loading) {
            return (
               <div>Loading CTA Data</div>
            );
        }
    };

    get_train_line = (line) => {
        if (line == "Brn") {
          return (
              <div className={"train-line brown-line"}>
                  BROWN
              </div>
          )
        } else if (line == "P") {
          return (
              <div className={"train-line purple-line"}>
                  PURPLE
              </div>
          )
        }
        else if (line == "G") {
          return (
              <div className={"train-line green-line"}>
                  GREEN
              </div>
          )
        }
        else if (line == "Pink") {
          return (
              <div className={"train-line pink-line"}>
                  PINK
              </div>
          )
        }
        else if (line == "Blue") {
            return (
                <div className={"train-line blue-line"}>
                    BLUE
                </div>
            )
          }
          else if (line == "Org") {
            return (
                <div className={"train-line orange-line"}>
                    ORANGE
                </div>
            )
          }
          else if (line == "Red") {
            return (
                <div className={"train-line red-line"}>
                    RED
                </div>
            )
          }
        else {
            return (
            <div>{line}</div>
            )
        }
    }
  
    handle_station_change(option) {
      this.setState({ station_id: option.value}, () => this.getTrainSchedule());
    }
    
    date_from_cta_str = (input_str) => {
     var min = parseInt(input_str.substring(12,14));
     var hour = parseInt(input_str.substring(9,11));
     var arrival_time = new Date();
     arrival_time.setMinutes(min);
     arrival_time.setHours(hour);
     return arrival_time;
    }
  
    diff_minutes = (dt1, dt2) => {
      var diff =(dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60;
      return Math.abs(Math.round(diff));
    }
    displayTrainSchedule = () => {
        if (!this.state.is_loading && this.state.arrivals_list.length > 0) {
          var cur_time = new Date();
          const colourStyles = {
              control: styles => ({ ...styles, backgroundColor: '#2a2a2a', color: "white" }),
              option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                return {
                  ...styles,
                  backgroundColor: isFocused ? "white" : "#2a2a2a",
                  color: isFocused  ? "#2a2a2a" : "white",
                  border: "1px solid grey"
                };
              },
              placeholder: (base) => ({
                ...base,
                color: "white",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
              menuPortal: (base) => ({
                ...base,
                color: "whjite",
              }),
              menu: (base) => ({
                  ...base,
                  // override border radius to match the box
                  borderRadius: 0,
                  // kill the gap
                  marginTop: 0,
                  color: "white",
                  border: "0.1px solid grey",
                  borderRadius: 4
                }),
                menuList: (base) => ({
                  ...base,
                  // kill the white space on first and last option
                  padding: 0,
                  color: "white",
                  border: "0.1px solid grey",
                  borderRadius: 4
                })
            };
           return (
               <div>
               <div style={{"margin-top": "20px", "margin-bottom": "40px"}}>
                   <Select
                               defaultValue={stationOptions[2]}
                               label="Single select"
                               options={stationOptions}
                               onChange={this.handle_station_change.bind(this)}
                               styles={colourStyles}
                              />
                </div>
                   <table style={{"table-layout":"fixed", width: "100%", "font-size": "20px"}}>
                       <thead>
                           <tr>
                               <th>
                                   Line
                               </th>
                               <th>
                                  Destination
                               </th>
                               <th>
                                   Arriving (min)
                               </th>
                           </tr>
                           </thead>
                      <tbody>
                   <React.Fragment>
                    {this.state.arrivals_list.map((x) => (
                        <tr className="cta-arrival-element">
                          <td>{this.get_train_line(x.rt)}</td>
                          <td>{x.destNm}</td>
                          <td>{this.diff_minutes(cur_time, this.date_from_cta_str(x.arrT[0]))}</td>
                        </tr>
                    ))}
                  </React.Fragment>
                  </tbody>
                   </table>
               </div>
           )
        } else {
            return ( <div>No Train Data</div>)
        }
    }

    render() {
        return (
            <div>
                {this.loadingMessage()}
                {this.displayTrainSchedule()}
            </div>
        )
    }
}

  export default CTASchedule;