const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact_list_practice_db');

const db = mongoose.connection;
db.on('error',console.error.bind(console,'Error while connceting'));
db.once('open',function () {
    console.log('Successfully Connected to the database');
});