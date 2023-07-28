const router = require('express').Router();

const { updateUserValidation, updateAvatarValidation } = require('../middlewares/celebrate');

const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
