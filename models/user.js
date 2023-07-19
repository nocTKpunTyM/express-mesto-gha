const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "Имя" должно быть заполнено'],
    minlength: [2, 'Минимальная длинна поля "Имя" 2 символа'],
    maxlength: [30, 'Максимальная длинна поля "Имя" 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Поле "О себе" должно быть заполнено'],
    minlength: [2, 'Минимальная длинна поля "О себе" 2 символа'],
    maxlength: [30, 'Максимальная длинна поля "О себе" 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле "Ссылка на аватар" должно быть заполнено'],
    validate: { 
      validator: (v) => validator.isURL(v), 
      message: 'Некорректный URL', 
    },
  },
},
{ versionKey: false }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
