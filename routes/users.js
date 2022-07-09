const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/BadRequest');

const {
  getCurrentUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/', getUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле должно содержать не менее 2 символов',
      'string.max': 'Поле должно содержать не более 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле должно содержать не менее 2 символов',
      'string.max': 'Поле должно содержать не более 30 символов',
    }),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new BadRequest('Неправильный формат ссылки на изображение');
        }
        return value;
      }),
  }),
}), updateAvatar);

module.exports = router;
