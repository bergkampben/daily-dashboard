const express = require('express');
const bodyParser = require('body-parser');

const util = require("util");
const request = require("request");
const get = util.promisify(request.get);

const BEARER_TOKEN = process.env.TWITTER_API_KEY;

const hashtagURL = new URL(
  "https://api.twitter.com/1.1/trends/place.json?id=2379574"
)

const API_KEY = process.env.CTA_API_KEY;
const TRAIN_SCHED_URL_BASE = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key="

function get_cta_url(station) {
  return TRAIN_SCHED_URL_BASE + API_KEY + "&mapid=" + station;
}

//var currentWeatherURL = "https://api.weather.gov/gridpoints/LOT/75,72/forecast"
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=" + WEATHER_API_KEY;


const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
function get_stock_url(symbol) {
  return "https://finnhub.io/api/v1/quote?symbol=" + symbol + "&token=" + FINNHUB_API_KEY;
}

var last_weather_json;
var weather_set = false;

var cta_data = {};
var cta_set_data = {};

var stock_data = {};
var stock_set_data = {};

const cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/twitter-results', async (req, res) => {
    const token = BEARER_TOKEN;
    const requestConfig = {
      url: hashtagURL,
      auth: {
        bearer: token,
      },
      json: true,
    };
  
    try {
      const response = await get(requestConfig);  
      if (response.statusCode !== 200) {
        if (response.statusCode === 403) {
          res.status(403).send(response.body);
        } else {
          throw new Error(response.body.error.message);
        }
      }
      res.send(response.body);
    } catch (e) {
      console.log(e)
      res.send(e);
    }
});

async function get_cta_schedule(station) {
  
  if (!(station in cta_data)) {
    cta_data[station] = await get(get_cta_url(station));
    cta_set_data[station] = true;
  }
  else if (cta_set_data[station] == false) {
    cta_data[station] = await get(get_cta_url(station));
    cta_set_data[station] = true;
  }
  return cta_data[station];
}

app.get('/api/cta-schedule', async (req, res) => {
  
  var station = req.query.station;
  var schedule = await get_cta_schedule(station);

res.send(schedule);
});

async function get_stock_prices(symbol) {
  
  if (!(symbol in stock_data)) {
    stock_data[symbol] = await get(get_stock_url(symbol));
    stock_set_data[symbol] = true;
  }
  else if (stock_set_data[symbol] == false) {
    stock_data[symbol] = await get(get_stock_url(symbol));
    stock_set_data[symbol] = true;
  }
  return stock_data[symbol];
}

app.get('/api/stock-price', async (req, res) => {

  var symbol = req.query.symbol;
  var prices = await get_stock_prices(symbol);
  res.send(prices.body)
  //res.send({"c":55.866,"h":56.08,"l":55.11,"o":55.47,"pc":55.47,"t":1609434955})
});


async function get_weather() {
  const requestConfig = {
    url: currentWeatherURL,
    headers: {
      'User-Agent': "bergkampben@gmail.com"
    },
    json: true,
  };
  last_weather_json = await get(requestConfig);
  weather_set = true;
}

app.get('/api/weather', async (req, res) => {

  if (!weather_set) {
    await get_weather();
  }
  res.send(last_weather_json.body);
});                            

function mark_weather_unset() {
  weather_set = false;
}

function mark_cta_unset() {
  for (var key in cta_set_data) {
    cta_set_data[key] = false;
  }
}

function mark_stocks_unset() {
  for (var key in stock_set_data) {
    stock_set_data[key] = false;
  }
}

setInterval(mark_weather_unset, 600000); // 10 Minutes for Weather
setInterval(mark_stocks_unset, 600000); // 10 Minutes for Stocks
setInterval(mark_cta_unset, 60000); // 1 Minute for CTA


if (process.env.NODE_ENV === "production") {
  console.log("Serving prod resource");
  app.use(express.static("build"));
  app.get("*", (req, res) => res.sendFile(path.resolve("build", "index.html")));
}

if (process.env.NODE_ENV === "dev") {
  console.log("Serving dev resource");
  app.use(express.static("public"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve("public", "index.html"))
  );
}

app.listen(port, () => console.log(`Listening on port ${port}`));