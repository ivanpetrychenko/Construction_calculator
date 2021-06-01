const {Router} = require('express');
const router = Router();
const fs = require('fs');

router.post('/', async (req, res) => {
    try {
        const {url} = req.body;
        res.sendFile(url, {root: './'});

    } catch (e) {
        res.status(500).json({ message: 'Щось пішло не так, спробуйте ще' })
    }
});

router.get('/all', async (req, res) => {
    try {
        const currentDirPath = './managePdf/storage/';

        fs.readdir(currentDirPath, (err, files) => {
            const result = [];

            files.forEach(fileName => {
                if (/\.pdf$/.test(fileName)) {
                    result.push({
                        name: fileName,
                        url: `${currentDirPath}${fileName}`,
                    })
                }
            });
            res.json({result})
        })

    } catch (e) {
        res.status(500).json({ message: 'Щось пішло не так, спробуйте ще' })
    }
});

module.exports = router;