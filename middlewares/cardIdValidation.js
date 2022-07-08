const { celebrate, Joi } = require('celebrate');

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports = cardIdValidation;
