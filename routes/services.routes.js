const {Router} = require('express');
const router = Router();
const Operation = require('../models/Operation');

router.get('/', async (req, res) => {
    try {
      const links = await Operation.find();
      res.json(links)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      Operation.findOneAndUpdate({id:id}, req.body)
      .then(operation => res.json({ msg: 'Обновление успешно' }))
      .catch(err =>
       res.status(400).json({ error: 'Невозможно обновить базу данных' })
      );

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

module.exports = router;