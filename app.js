const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path')

const app = express();

app.use(express.json({extended: true}));

app.use('/squares', require('./routes/squares.routes'));
app.use('/operations', require('./routes/services.routes'));
app.use('/admin', require('./routes/admin.routes'));
app.use('/createpdf', require('./routes/createpdf.routes'));
app.use('/downloadpdf', require('./routes/downloadpdf.routes'));

app.use('/', express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
    PORT = config.get('port') || 5000;
}

async function start() {
    try {
       await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
       });
       app.listen(PORT, () => console.log(`Started! on port ${PORT}...`));
    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();

