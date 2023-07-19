const User = require('../models/user');

let errCode = 500;
let errMessage = 'Другая ошибка';

const whatError = (err) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    errCode = 400;
    errMessage = 'Неверно введены данные';
  }
  if (err.name === 'Error') {
    errCode = 404;
    errMessage = 'Пользователь не найден';
  }
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send({ message: errMessage });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(new Error())
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
       whatError(error);
       res.status(errCode).send({ message: errMessage });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .orFail(new Error())
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send({ message: errMessage });
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
      res.status(errCode).send({ message: errMessage });
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
      res.status(errCode).send({ message: errMessage });
    });
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
};
