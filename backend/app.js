const express = require ("express");
const bodyParser = require ("body-parser");

const HttpError = require("./models/http-error");

const societySignup = require('./routes/societySignup');
const societyLogin = require('./routes/societyLogin');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); 
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if(req.method === "OPTIONS") { 
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({})
  }
  next(); 
});

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