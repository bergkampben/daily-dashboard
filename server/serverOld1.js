
//const express = require('express');
//const bodyParser = require('body-parser');
const util = require("util");
const request = require("request");
//const path = require("path");
//const socketIo = require("socket.io");
//const http = require("http");
const get = util.promisify(request.get);

//const app = express();
//const port = process.env.PORT || 3001;
const cors = require('cors')

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors())


//var express = require('express');
//var app = express();
//app.use(cors())
//var server = app.listen(3001);
//var io = require('socket.io').listen(server);

var app = require('http');
app.createServer().listen(3001);


//const server = http.createServer(app);
//const io = socketIo(server);

const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAADy%2FKgEAAAAAwRMJDe9lGeg3QrtDQEvLbktcIPo%3DYRcggwqfK2XrSvTHaHPRWlpDvTEcloEnNvy2v1nJueS81MvTgk";

const streamURL = new URL(
    "https://api.twitter.com/2/tweets/1228393702244134912"
  )

  app.get('/', async (req, res) => {
    //res.send({ express: 'Hello From Express' });
    console.log("ROUTE CALLED-MAIN")
    const token = BEARER_TOKEN;
    const requestConfig = {
      url: streamURL,
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
      res.send(response);
    } catch (e) {
      console.log("ROUTE 6-MAIN")
      console.log(e)
      res.send(e);
    }
  
  });

app.get('/stuff', async (req, res) => {
  //res.send({ express: 'Hello From Express' });
  console.log("ROUTE CALLED")
  const token = BEARER_TOKEN;
  const requestConfig = {
    url: streamURL,
    auth: {
      bearer: token,
    },
    json: true,
  };

  console.log("ROUTE 2")

  try {
    console.log("ROUTE 3")
    const response = await get(requestConfig);
    console.log("ROUTE 4")

    if (response.statusCode !== 200) {
      if (response.statusCode === 403) {
        res.status(403).send(response.body);
      } else {
        throw new Error(response.body.error.message);
      }
    }
    console.log("ROUTE 5")
    res.send(response);
  } catch (e) {
    console.log("ROUTE 6")
    console.log(e)
    res.send(e);
  }

});

app.get('/api/hello', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

//var server = app.listen(port, () => console.log(`Listening on port ${port}`));
//var io = require('socket.io').listen(server);*/