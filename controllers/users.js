const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ message: 'Email и Пароль обязательны' });
  return bcrypt.hash(password, 10)
    .then((hash) => User.findOne({ email })
      .then(() => {
        User.create({ ...req.body, password: hash })
          .then(() => {
            res.status(201).send({ message: 'Пользователь зарегистрирован' });
          })
          .catch((next));
      }));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).send({ message: 'Email и Пароль обязательны' });
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(201).send({ token });
    })
    .catch((next));
};

const getUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.send(user);
    })
    .catch((next));
};

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError('Нет пользователей'))
    .then((users) => {
      res.send(users);
    })
    .catch((next));
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.send(user);
    })
    .catch((next));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.send(user);
    })
    .catch((next));
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  login,
};
