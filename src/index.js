const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('../src/app/controller/index')(app);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})
