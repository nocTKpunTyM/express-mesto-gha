const router = require('express').Router();
const {
  createCard,
  getCards,
  delCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:id', delCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);

module.exports = router;
