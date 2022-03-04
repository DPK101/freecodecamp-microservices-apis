// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", function(req, res) {
  const ipaddress = req.socket.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  res.json({
    ipaddress,
    language,
    software
  })
})

app.get("/api/:date?", function(req, res) {
  let unixMilliseconds;
  let utcDate;
  let response;
  if (req.params.date) {
    let validDate = new Date(req.params.date);
    validDate = validDate.getTime();
    if(!isNaN(validDate)) {
      const reqDate = new Date(req.params.date);
      unixMilliseconds = reqDate.getTime();
    } else {
      unixMilliseconds = Number(req.params.date);
    }
    utcDate = new Date(unixMilliseconds).toUTCString();
  } else {
    const reqDate = new Date();
    unixMilliseconds = reqDate.getTime();
    utcDate = new Date(unixMilliseconds).toUTCString();
  }

  if (!Number.isNaN(unixMilliseconds)) {
    response = { "unix": unixMilliseconds, "utc": utcDate };
  } else {
    response = { error: "Invalid Date" };
  }
  res.json(response);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
