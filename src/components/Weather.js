import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";

import "./css/weather-icons.css"
import "./css/weather-icons.min.css"


const Weather = () => {

    const [forecast, set_forecast] = useState(0);
    const [isLoading, setIsLoading ] = useState(true);

    const getWeather = async () => {
        const response = await fetch('api/weather');
        const body = await response.json();
        if (response.status != 200) throw Error(body.message);
        return body;
    }

const loadingMessage = () => {
    const message = {
        title: "Loading Weather",
        detail: "..."
    }

    if (isLoading) {
        return (
            <React.Fragment>
                <div>
                    <ErrorMessage
                        key={message.title}
                        error={message}
                        styleType="success"
                    />
                </div>
                <Spinner />
            </React.Fragment>
        );
    }
};

  function updateWeather() {
    getWeather()
    .then(res => {
        set_forecast(res);
        setIsLoading(false);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getWeather()
    .then(res => {
        set_forecast(res);
        setIsLoading(false);
    })
    .catch(err => console.log(err));
}, []);

function kelvinToF(kTemp) 
{
  return ((kTemp - 273.15) * 9 / 5 + 32).toFixed();
  
}

const displayFeed = () => {
    if (!isLoading) {
        var icon = forecast.weather[0].icon;
        var image_url = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
        
        var sunrise = new Date(0);
        sunrise.setUTCSeconds(forecast.sys.sunrise);
        var sunset = new Date(0);
        sunset.setUTCSeconds(forecast.sys.sunset);

        return (
          <div style={{height: "100%"}}>
            <div style={{height: "30%"}}>
                <div style={{width: "45%", height: "100%", float: "left"}}>
                    <div style={{"margin-top": "10px", "margin-bottom": "10px"}}>
                        Chicago, IL
                    </div>
                    <div style={{"display": "flex","position": "relative","left": "15px",}}>
                        <div style={{"font-size": "60px", "margin-right": "4px"}}>
                            {kelvinToF(forecast.main.temp)}
                        </div>
                        <div style={{"flex-grow": "1", "font-size": "40px"}}>
                            <i className=" wi wi-fahrenheit"></i>
                        </div>
                    </div>
                    <div>
                        {forecast.weather.description}
                    </div>
                </div>
                <div style={{width: "45%", height: "50%", float: "left"}}>
                    <img src={image_url} style={{width: "500px", "position": "relative", "bottom": "30px"}}></img>
                </div>
            </div>
            <div style={{width: "45%", float: "left"}}>
                    <table style={{"table-layout":"fixed", width: "100%", "font-size": "20px"}}>
                        <tbody>
                            <tr className="weather-element">
                                <td>
                                    <div style={{float: "left"}}>
                                        <div style={{"display": "flex"}}>
                                            <div style={{"font-size": "15px", "margin-right": "8px"}}>
                                                <i className="wi wi-thermometer-exterior"></i>
                                            </div>
                                            <div style={{"flex-grow": "1"}}>
                                                Feels Like
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{"float": "right"}}>
                                    {kelvinToF(forecast.main.feels_like)}
                                    </div>
                                </td>
                            </tr>
                            <tr className="weather-element">
                                <td>
                                <div style={{float: "left"}}>
                                        <div style={{"display": "flex"}}>
                                            <div style={{"font-size": "15px", "margin-right": "8px"}}>
                                                <i className=" wi wi-thermometer-exterior"></i>
                                            </div>
                                            <div style={{"flex-grow": "1"}}>
                                                High/Low
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{"float": "right"}}>
                                    {kelvinToF(forecast.main.temp_max)} / {kelvinToF(forecast.main.temp_min)}
                                    </div>
                                </td>
                            </tr>
                            <tr className="weather-element">
                                <td>
                                <div style={{float: "left"}}>
                                        <div style={{"display": "flex"}}>
                                            <div style={{"font-size": "15px", "margin-right": "8px"}}>
                                                <i className=" wi wi-strong-wind"></i>
                                            </div>
                                            <div style={{"flex-grow": "1"}}>
                                                Wind
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{"float": "right"}}>
                                    {forecast.wind.speed}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                </div>
                
                <div style={{width: "45%", float: "right"}}>
                    <div>
                        <table style={{"table-layout":"fixed", width: "100%", "font-size": "20px"}}>
                        <tbody>
                            <tr className="weather-element">
                                <td>
                                    <div style={{float: "left"}}>
                                        <div style={{"display": "flex"}}>
                                            <div style={{"font-size": "15px", "margin-right": "8px"}}>
                                                <i className="wi wi-humidity"></i>
                                            </div>
                                            <div style={{"flex-grow": "1"}}>
                                                Humidity
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{"float": "right"}}>
                                    {forecast.main.humidity}
                                    </div>
                                </td>
                            </tr>
                            <tr className="weather-element">
                                <td>
                                <div style={{float: "left"}}>
                                        <div style={{"display": "flex"}}>
                                            <div style={{"font-size": "15px", "margin-right": "8px"}}>
                                                <i className=" wi wi-sunrise"></i>
                                            </div>
                                            <div style={{"flex-grow": "1"}}>
                                                Sunrise
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{"float": "right"}}>
                                    {sunrise.getHours()}:{sunrise.getMinutes()}
                                    </div>
                                </td>
                            </tr>
                            <tr className="weather-element">
                                <td>
                                <div style={{float: "left"}}>
                                        <div style={{"display": "flex"}}>
                                            <div style={{"font-size": "15px", "margin-right": "8px"}}>
                                                <i className=" wi wi-sunset"></i>
                                            </div>
                                            <div style={{"flex-grow": "1"}}>
                                                Sunset
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{"float": "right"}}>
                                    {sunset.getHours()}:{sunset.getMinutes()}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                <div>
                </div>
            </div>
        </div>
        )
    } else {
        return <div>LOADING</div>
    }
}

return (
    <div>
        {loadingMessage()}
        {displayFeed()}
    </div>
)
}


export default Weather;