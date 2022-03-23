const express = require('express');
const path = require('path');
const port = 8001;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactlist = [
    {
        name: "Vaibhav",
        number: "9658523"
    },
    {
        name: "Pathak",
        number: "96554523"
    },
    {
        name: "Buhrr",
        number: "8965123"
    },
];

app.get('/', function (req, res) {
    // res.send('<h1>Hello World</h1>');

    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log("Error while fetching the data");
        }
        return res.render('home', {
            title: 'My Contact List',
            contact_list: contacts
        });
    });
});

app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: 'Practice'
    });
});

app.post('/create-contact', function (req, res) {
    contactlist.push({
        name:req.body.name,
        number:req.body.number
    });
    Contact.create({
        name: req.body.name,
        number: req.body.number
    }, function (err, newcontact) {
        if (err) {
            console.log("Error while creating the contact");
            return;
        }
        return res.redirect('back');
    });
});

app.get('/delete-contact/', function (req, res) {
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("Error while deleting the contact");
            return;
        }
        return res.redirect('/');
    });
});

app.listen(port, function (err) {
    if (err) {
        console.log("Error while setting up server ", err);
        return;
    }
    console.log("Server is running using express");
});