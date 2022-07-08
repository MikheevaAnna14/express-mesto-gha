const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regExLink = require('../errors/regExLink');

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
    userId: Joi.string().alphanum().length(24),
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
    avatar: Joi.string().regex(regExLink),
  }),
}), updateAvatar);

module.exports = router;
