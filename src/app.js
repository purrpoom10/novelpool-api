require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFound = require('./middlewares/notFound');
const error = require('./middlewares/error');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(notFound);
app.use(error);

const port = process.env.port || 8000;

app.listen(port, () => console.log(`Sever running on port : ${port}`));
