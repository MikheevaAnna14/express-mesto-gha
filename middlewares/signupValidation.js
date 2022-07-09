const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/BadRequest');

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Это поле должно быть заполнено',
      'string.email': 'Неверный формат электронной почты',
    }),
    password: Joi.string().required().messages({
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
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequest('Неправильный формат ссылки на изображение');
      }
      return value;
    }),
  }),
});

module.exports = signupValidation;
