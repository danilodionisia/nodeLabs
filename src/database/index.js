const mongoose = require('mongoose');
const database = process.env.DATABASE_CONN;

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;