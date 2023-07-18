const User = require('../models/user');

let errCode = 500;
let errMessage = 'Другая ошибка';

const whatError = (err) => {
  if (err.name === 'CastError') {
    errCode = 404;
    errMessage = 'Пользователь не найден';
  }
  if (err.name === 'ValidationError') {
    errCode = 400;
    errMessage = 'Неверно введены данные';
  }
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send(errMessage);
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send(errMessage);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send(errMessage);
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send(errMessage);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send(errMessage);
    });
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
};