const {Router} = require('express');
const router = Router();
const InvoiceGenerator = require('../managePdf/InvoiceGenerator');

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const ig = new InvoiceGenerator(data);
        let igRes = ig.generate();

        if (!igRes) {
            res.status(500).json({ message: 'Недостатньо даних' })
        } else {
            res.json({ message: igRes });
        }
    } catch (e) {
        res.status(500).json({ message: 'Щось пішло не так, спробуйте ще' })
    }
});

module.exports = router;