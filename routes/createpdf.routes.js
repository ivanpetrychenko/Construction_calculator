const {Router} = require('express');
const router = Router();
const InvoiceGenerator = require('../managePdf/InvoiceGenerator');

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const ig = new InvoiceGenerator(data);
        let igRes = ig.generate();

        // if (!igRes) {
        //     res.status(500)
        // } else {
        //     const pdf = fs.readFileSync(`./${igRes}`);
        //     res.contentType("application/pdf");
        //     res.send(pdf);
        // }

        res.json({ message: igRes });
    } catch (e) {
        res.status(500).json({ message: 'Щось пішло не так, спробуйте ще' })
    }
});

module.exports = router;