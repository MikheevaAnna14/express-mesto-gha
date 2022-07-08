const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const cardIdValidation = require('../middlewares/cardIdValidation');

const {
  createCard,
  getCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Поле должно содержать не менее 2 символов',
        'string.max': 'Поле должно содержать не более 30 символов',
        'any.required': 'Это поле должно быть заполнено',
      }),
    link: Joi.string()
      .required()
      .min(2)
      .max(30)
      .regex(/^https?:\/\/(www\.)?[\w-]+[\.\w][\w\/-~:\?#\[\]@!\$&'()\*\+,;\=]*#?/)
      .messages({
        'string.min': 'Поле должно содержать не менее 2 символов',
        'string.max': 'Поле должно содержать не более 30 символов',
        'any.required': 'Это поле должно быть заполнено',
      }),
  }),
}), createCard);
router.get('/', getCard);
router.delete('/:cardId', cardIdValidation, deleteCard);
router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
