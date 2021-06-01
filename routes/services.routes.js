const {Router} = require('express');
const router = Router();
const Operation = require('../models/Operation');

router.get('/', async (req, res) => {
    try {
      const links = await Operation.find();
      res.json(links)
    } catch (e) {
      res.status(500).json({ message: 'Щось пішло не так, спробуйте ще' })
    }
});

router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      Operation.findOneAndUpdate({id:id}, req.body)
      .then(operation => res.json({ msg: 'Оновлення успішно' }))
      .catch(err =>
       res.status(400).json({ error: 'Неможливо оновити базу даних' })
      );

    } catch (e) {
      res.status(500).json({ message: 'Щось пішло не так, спробуйте ще' })
    }
});

module.exports = router;