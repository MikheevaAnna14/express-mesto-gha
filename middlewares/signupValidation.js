const { celebrate, Joi } = require('celebrate');
const regExLink = require('../errors/regExLink');

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Это поле должно быть заполнено',
      'string.email': 'Неверный формат электронной почты',
    }),
    password: Joi.string().required().min(8).messages({
      'string.min': 'Пароль должен содержать не менее 8 символов',
      'any.required': 'Это поле должно быть заполнено',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле должно содержать не менее 2 символов',
      'string.max': 'Поле должно содержать не более 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле должно содержать не менее 2 символов',
      'string.max': 'Поле должно содержать не более 30 символов',
    }),
    avatar: Joi.string().regex(regExLink),
  }),
});

module.exports = signupValidation;
