const Card = require('../models/card');

let errCode = 500;
let errMessage = 'Другая ошибка';

const whatError = (err) => {
  if (err.name === 'CastError') {
    errCode = 404;
    errMessage = 'Карточка не найдена';
  }
  if (err.name === 'ValidationError') {
    errCode = 400;
    errMessage = 'Неверно введены данные';
  }
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send({ message: errMessage });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send({ message: errMessage });
    });
};

const delCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send({ message: errMessage });
    });
};

const likeCard = (req, res) => {
  const { id } = req.params;
  const user = req.user._id;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: user } },
    { new: true },
  )
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send({ message: errMessage });
    });
};

const dislikeCard = (req, res) => {
  const { id } = req.params;
  const user = req.user._id;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: user } },
    { new: true },
  )
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      whatError(error);
      res.status(errCode).send({ message: errMessage });
    });
};

module.exports = {
  createCard,
  getCards,
  delCard,
  likeCard,
  dislikeCard,
};
