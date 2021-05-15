const mongoose = require('mongoose');
const database = process.env.DATABASE_CONN;

mongoose.set('useCreateIndex', true);
mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;