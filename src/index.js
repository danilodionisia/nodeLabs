const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./controller/authController')(app);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})
