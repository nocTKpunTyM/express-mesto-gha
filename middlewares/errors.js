const errorsMid = (err, req, res, next) => {
  if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже есть' });
  }
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на сервере' : message });
  next();
};
module.exports = errorsMid;
