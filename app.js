const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/not-found-err');
const { signinValidation, signupValidation } = require('./middlewares/celebrate');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(DB_URL);

const app = express();

app.use(helmet());

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsMid = require('./middlewares/errors');

app.use(bodyParser.json());

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use((req, res, next) => {
  next(new NotFoundError({ message: 'Страница не найдена' }));
});
app.use(errors());
app.use(errorsMid);
app.listen(PORT);
