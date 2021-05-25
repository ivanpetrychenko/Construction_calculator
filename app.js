const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));

app.use('/squares', require('./routes/squares.routes'));
app.use('/operations', require('./routes/services.routes'));
app.use('/admin', require('./routes/admin.routes'));
app.use('/createpdf', require('./routes/createpdf.routes'));

const PORT = config.get('port') || 5000;

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

