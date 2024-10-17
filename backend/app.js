const express = require("express");

const HttpError = require("./models/http-error");

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocs = require('./swaggerConfig');

const Auth = require("./routes/Auth");
const Register = require("./routes/Register");
const OwnersModule = require("./routes/ownersModule");
const SocietyProfile = require("./routes/SocietyProfile");
const financeModule = require("./routes/financeModule");
const communityCommunicationModule= require("./routes/communityCommunicationModule");


const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({})
  }
  next();
});

// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', Auth);

app.use('/api/register', Register);

app.use('/api/ownersModule', OwnersModule);

app.use('/api/society', SocietyProfile);

app.use('/api/finance', financeModule);

app.use('/api/community-communications', communityCommunicationModule);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred.', errors: error.data || [] });
});

app.listen(5007);