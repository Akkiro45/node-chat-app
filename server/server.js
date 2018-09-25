const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(publicPath));

// Routes

app.listen(port, (e) => {
  if(e) {
    console.log('Unable to connect to server.');
  } else {
    console.log(`Connected to server on PORT ${port}.`);
  }
});
