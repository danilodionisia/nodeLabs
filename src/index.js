const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('../src/app/controller/index')(app);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})
