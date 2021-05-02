const {Router} = require('express');
const router = Router();
const Square = require('../models/Square');

router.get('/', async (req, res) => {
    try {
      const links = await Square.find();
      res.json(links)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router;