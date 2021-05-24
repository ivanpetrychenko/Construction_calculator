const {Router} = require('express');
const router = Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
    try {
        const {login, password} = req.body;

        const user = await Admin.findOne({login});
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }
        console.log(user.password, password)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Неверный пароль' })
        }

        const token = jwt.sign(
            {userId: user._id},
            config.get("jwt"),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user._id})

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});

module.exports = router;