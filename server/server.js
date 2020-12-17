const express = require('express');
const bodyParser = require('body-parser');

const util = require("util");
const request = require("request");
const get = util.promisify(request.get);

const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAADy%2FKgEAAAAAwRMJDe9lGeg3QrtDQEvLbktcIPo%3DYRcggwqfK2XrSvTHaHPRWlpDvTEcloEnNvy2v1nJueS81MvTgk";

const streamURL = new URL(
  "https://api.twitter.com/2/tweets/1228393702244134912"
)

const hashtagURL = new URL(
  "https://api.twitter.com/1.1/trends/place.json?id=2379574"
)

const cors = require('cors')
const app = express()
app.use(cors())
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', async (req, res) => {
  console.log("ROUTE CALLED-MAIN")
    const token = BEARER_TOKEN;
    const requestConfig = {
      url: hashtagURL,
      auth: {
        bearer: token,
      },
      json: true,
    };
  
    console.log("ROUTE 2-MAIN")
  
    try {
      console.log("ROUTE 3-MAIN")
      const response = await get(requestConfig);
      console.log("ROUTE 4-MAIN")
  
      if (response.statusCode !== 200) {
        if (response.statusCode === 403) {
          res.status(403).send(response.body);
        } else {
          throw new Error(response.body.error.message);
        }
      }
      console.log("ROUTE 5-MAIN")
      console.log(response.body)
      res.send(response.body);
    } catch (e) {
      console.log("ROUTE 6-MAIN")
      console.log(e)
      res.send(e);
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));