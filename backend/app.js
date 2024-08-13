const express = require ("express");
const bodyParser = require ("body-parser");

const HttpError = require("./models/http-error");

const societySignup = require('./routes/societySignup');
const societyLogin = require('./routes/societyLogin');

const app = express();

app.use(bodyParser.json());

app.use('/api/signup/society',societySignup);

app.use('/api/login/society',societyLogin);


app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  
  res.json({message: error.message || 'An unknown error occurred.', errors: error.data || []});
});



app.listen(5007);