const { celebrate, Joi } = require('celebrate');

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Это поле должно быть заполнено',
      'string.email': 'Неверный формат электронной почты',
    }),
    password: Joi.string().required().min(8).messages({
      'string.min': 'Пароль должен содержать не менее 8 символов',
      'any.required': 'Это поле должно быть заполнено',
    }),
  }),
});

module.exports = signinValidation;
