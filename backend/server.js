const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const authroutes = require('./routes/authroutes');


const app = express();


// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'yumhub_secret_key',
    resave: false,
    saveUninitialized: true
}));

mongoose.connect('mongodb+srv://navyarshetty536:123navya@myrecipe.qffbfdb.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true });
app.use(authroutes);

app.listen(3002, () => {
    console.log('Server started on http://localhost:3002');
 });
 
