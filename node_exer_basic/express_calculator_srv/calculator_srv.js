// install nodemon to make it easier to autostart server

const express = require('express');
const app = express();
const path = require('path');

// __dirname means the current folder
// add static files to route
app.use(express.static(path.join(__dirname, 'src')));

// "/" means root route of the listened port
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(3500, function() {
  console.log("local host 3500");
  // check localhost:3500 at your browser
});
